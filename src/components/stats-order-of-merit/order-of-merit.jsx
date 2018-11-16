import React, { Component } from 'react';
import { connect } from 'react-redux'

import { updateSelectedYear } from '../../redux/actions';

import OrderOfMeritDisplay from './order-of-merit-display';
import OrderOfMeritChart from './order-of-merit-chart';
import * as helpers from '../../utilities/helper-functions/helpers';
import SelectYearOfCompetition from '../../utilities/helper-functions/select-year-of-competition';

const SELECTED_YEAR = 'selectedYearOrderOfMerit';

class OrderOfMerit extends Component {

    state = {
        previousYearOfCompetition: this.props.appData.miscInfo[SELECTED_YEAR],
        yearOfCompetition: this.props.appData.miscInfo[SELECTED_YEAR],
        height: 100
    }

    static getDerivedStateFromProps(nextProps, prevState){
        // This React static method getDerivedStateFromProps replaces componentWillReceiveProps from React 16.3 onwards
        // It doesn't have access to this so can't set state etc, only return an object, and then componentDidUpdate is called
        // This function is called when a) the year of competition is changed from within Order Of Merit itself, and b) from a link in Player Profile (Order of Merit history)
        // Because it is called in more than one place you need the 2 fields in state above.
        if (prevState.yearOfCompetition !== prevState.previousYearOfCompetition) {                    // Applies in case a) above 
            return { yearOfCompetition: prevState.yearOfCompetition};
        } else if (nextProps.match && nextProps.match.params.yearOfCompetition && (nextProps.match.params.yearOfCompetition !== prevState.yearOfCompetition)) {        // Applies in case b) above 
            return { yearOfCompetition: nextProps.match.params.yearOfCompetition};
        } else {
            return { yearOfCompetition: prevState.yearOfCompetition};
            // return null;
        }
    }

    componentDidMount() {
        helpers.goToTopOfPage();
        helpers.changeViewPortHeightOfStatsElementOnMount(this);

        if (this.state.yearOfCompetition !== this.state.previousYearOfCompetition) {
            this.updateYearOfCompetitionState(this.state.yearOfCompetition);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        helpers.changeViewPortHeightOfStatsElementOnUpdate(this, prevState);
    }
    
    handleChange = yearOfCompetition => {
        this.updateYearOfCompetitionState(yearOfCompetition);
        helpers.changeViewPortHeightOfStatsElementOnMount(this);
    };

    updateYearOfCompetitionState(yearOfCompetition) {
        this.setState({yearOfCompetition : yearOfCompetition});
        this.props.dispatch(updateSelectedYear({[SELECTED_YEAR]: yearOfCompetition}));
    }

    render() {
        let {courses, allRounds} = this.props.appData;

        let yearOfCompetition = parseInt(this.props.appData.miscInfo[SELECTED_YEAR], 10);
        let roundsForYear = helpers.getRoundsForYearOfCompetition(allRounds, yearOfCompetition);
        let isSeasonCompleted = roundsForYear.isSeasonCompleted;
        let oom = helpers.createOOMArray(courses, roundsForYear.roundsForYearOfCompetition, yearOfCompetition);
        let oomCumulativePointsByRound = helpers.createOOMCumulativePointsByRoundArray(oom);
        let oomPointsTotals = helpers.createTotalsArray(oom, "oomPoints");
        let winners = helpers.getPositionsOfTotals(oomPointsTotals);
        let majorsPlayed = getMajorsPlayed(oom);

        return (

            <div className="stats-outer" style={{height: this.state.height + "vh"}}>       {/* Remember to set the style element */}

                {/* Add a ref so that the size of the box can be determined and the height in vh units set accordingly */}
                <div className="stats order-of-merit" ref={el => this.statsBottom = el}>

                    <header className="header">

                        <span className="title">Order Of Merit
                            <SelectYearOfCompetition
                                allRounds={allRounds}
                                yearOfCompetition={yearOfCompetition}
                                updateYearOfCompetition={this.handleChange}
                                includeAllYears={false}
                            />
                        </span>
                        
                        <span
                            className="winners">{isSeasonCompleted ? "Winner" : "Current Leader"}{winners.length > 1 ? "s" : ""}
                            {winners.map((player, i) => (<img key={i} className="img-winners" src={helpers.getPlayerImage(player)} alt="" />))}
                        </span>

                    </header>

                    <OrderOfMeritDisplay
                        yearOfCompetition = {yearOfCompetition}
                        isSeasonCompleted = {isSeasonCompleted}
                        oom = {oom}
                        oomPointsTotals = {oomPointsTotals}
                        winners = {winners}
                        majorsPlayed = {majorsPlayed}
                    />

                    <OrderOfMeritChart
                        yearOfCompetition = {yearOfCompetition}
                        oomCumulativePointsByRound = {oomCumulativePointsByRound}
                    />

                </div>
            </div>
        )
    }
}

function getMajorsPlayed(oom) {
    let majors = 0;
    let nonMajors = 0;

    oom.forEach(round => {
        majors += (round.isMajor ? 1 : 0);
        nonMajors += (round.isMajor ? 0 : 1);
    });

    return { majors: majors, nonMajors: nonMajors }
}

const mapStateToProps = (state, ownProps) => ({appData: Object.assign({}, state.appData)})

export default connect(mapStateToProps, null)(OrderOfMerit);