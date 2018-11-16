import React, { Component } from 'react';
import { connect } from 'react-redux'

import { updateSelectedYear } from '../../redux/actions';

import {PLAYERS_ARRAY, STATS_MIN_VIEWPOINT_HEIGHT} from '../../utilities/constants';
import NearestThePinsDisplay from './nearest-the-pins-display';
import * as helpers from '../../utilities/helper-functions/helpers';
import SelectYearOfCompetition from '../../utilities/helper-functions/select-year-of-competition';

const SELECTED_YEAR = 'selectedYearNearestThePins';


class NearestThePins extends Component {

    state = { height: STATS_MIN_VIEWPOINT_HEIGHT };

    handleChange = yearOfCompetition => {
        this.props.dispatch(updateSelectedYear({[SELECTED_YEAR]: yearOfCompetition}));
        helpers.changeViewPortHeightOfStatsElementOnMount(this);
    };

    createNTPsArray = (courses, roundsForYearOfCompetition, yearOfCompetition) => {
        let ntps = [];
    
        roundsForYearOfCompetition.forEach((round, roundNumber) => {
    
            const ntpsForRound = PLAYERS_ARRAY.map((player) => {
                return this.getNumberOfNTPsForPlayer(round[player]);
            });
    
            ntps.push({
                yearOfCompetition: yearOfCompetition,
                roundNumber: roundNumber + 1,
                dateOfRound: helpers.getFormattedDateForRound(yearOfCompetition, round.dateOfRound),
                courseName: helpers.getCorrectCourseName(courses, round.course),
                ntps: ntpsForRound,
                isMajor: round.isMajor
            });
        });
    
        return ntps;
    }

    getNumberOfNTPsForPlayer = (playersScore) => {
        return playersScore.filter((score, i) => i > 1 && helpers.isNTP(score)).length;
    }

    componentDidMount() {
        helpers.goToTopOfPage();
        helpers.changeViewPortHeightOfStatsElementOnMount(this);
    }

    componentDidUpdate(prevProps, prevState) {
        helpers.changeViewPortHeightOfStatsElementOnUpdate(this, prevState);
    }


    render() {
        let arraysOfRounds;
        let ntps = [];

        let {courses, allRounds} = this.props.appData;

        // let yearOfCompetition = parseInt(this.props.appData.miscInfo[SELECTED_YEAR], 10);
        let yearOfCompetition = this.props.appData.miscInfo[SELECTED_YEAR];
        let isAllYearsSelected = (yearOfCompetition === "All Years");

        if (isAllYearsSelected) {
            arraysOfRounds = helpers.getCompetitionYearArraysForAllYears(allRounds);
            arraysOfRounds.forEach(rounds => {
                ntps = [...ntps, ...this.createNTPsArray(courses, rounds.roundsForYearOfCompetition, rounds.yearOfCompetition)];
            });
        } else {
            arraysOfRounds = helpers.getRoundsForYearOfCompetition(allRounds, yearOfCompetition);
            ntps = this.createNTPsArray(courses, arraysOfRounds.roundsForYearOfCompetition, yearOfCompetition);
        }

        let ntpsTotals = helpers.createTotalsArray(ntps, "ntps");
        let winners = helpers.getPositionsOfTotals(ntpsTotals);

        return (
            
            <div className="stats-outer" style={{height: this.state.height + "vh"}}>       {/* Remember to set the style element */}

                {/* Add a ref so that the size of the box can be determined and the height in vh units set accordingly (i.e. really applies when All Years is selected) */}
                <div className={"stats nearest-the-pins" + (isAllYearsSelected ? " all-years" : "")} ref={el => this.statsBottom = el}>

                    <header className="header">

                        <span className="title">Nearest The Pins
                            <SelectYearOfCompetition
                                allRounds={allRounds}
                                yearOfCompetition={yearOfCompetition}
                                updateYearOfCompetition={this.handleChange}
                                includeAllYears={true}
                            />
                        </span>

                        <span
                            className="winners">Most
                            {winners.map((player, i) => (<img key={i} className="img-winners" src={helpers.getPlayerImage(player)} alt="" />))}
                        </span>

                    </header>

                    <NearestThePinsDisplay
                        yearOfCompetition = {yearOfCompetition}
                        ntps = {ntps}
                        ntpsTotals = {ntpsTotals}
                        winners = {winners}
                    />
                </div>
            </div>

        )
    }

}


const mapStateToProps = (state, ownProps) => ({appData: Object.assign({}, state.appData)})

export default connect(mapStateToProps, null)(NearestThePins);