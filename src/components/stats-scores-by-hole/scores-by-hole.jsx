import React, { Component } from 'react';
import { connect } from 'react-redux'

import { updateSelectedCourse } from '../../redux/actions';
import { updateSelectedYear } from '../../redux/actions';
import { updateSelectedPar } from '../../redux/actions';

import {PLAYERS_ARRAY, EAGLE, BIRDIE, PAR, BOGEY, DOUBLE_BOGEY_OR_WORSE, STATS_MIN_VIEWPOINT_HEIGHT} from '../../utilities/constants';
import ScoresByHoleDisplay from './scores-by-hole-display';
import * as helpers from '../../utilities/helper-functions/helpers';
import SelectCourse from '../../utilities/helper-functions/select-course';
import SelectYearOfCompetition from '../../utilities/helper-functions/select-year-of-competition';
import SelectPar from '../../utilities/helper-functions/select-par';

const SELECTED_COURSE = 'selectedCourseScoresByHole';
const SELECTED_YEAR = 'selectedYearScoresByHole';
const SELECTED_PAR = 'selectedParScoresByHole';


class ScoresByHole extends Component {

    state = { height: STATS_MIN_VIEWPOINT_HEIGHT };

    handleChangeCourse = courseName => {
        this.props.dispatch(updateSelectedCourse({[SELECTED_COURSE]: courseName}));
    };
    
    handleChangeYearOfCompetition = yearOfCompetition => {
        this.props.dispatch(updateSelectedYear({[SELECTED_YEAR]: yearOfCompetition}));
    };
    
    handleChangePar = par => {
        this.props.dispatch(updateSelectedPar({[SELECTED_PAR]: par}));
    };

    componentDidMount() {
        helpers.goToTopOfPage();
        helpers.changeViewPortHeightOfStatsElementOnMount(this);
    }

    createEmptyScoresByHoleArray = () => {
        let scoresByHole = [];
        for (let holeNumber = 1; holeNumber <= 18; holeNumber++) {
            scoresByHole.push({eagles: [0,0,0,0], birdies: [0,0,0,0], pars: [0,0,0,0], bogeys: [0,0,0,0], doubleBogeysOrWorse: [0,0,0,0]});
        }
        return scoresByHole;
    }

    calculateScoresByHole = (courses, roundsForYearOfCompetition, scoresByHole, par) => {
        roundsForYearOfCompetition.forEach((round) => {
            let course = helpers.getCourse(courses, round.course).holes;
            for (let playerNumber = 1; playerNumber <= 4; playerNumber++) {
                round[PLAYERS_ARRAY[playerNumber-1]].forEach((scoreForHole, holeNumber) => {
                    if(holeNumber >= 2) {
                        if (par === "All Pars" || par === course[holeNumber-2].par) {               // Test to see if user has selected All Pars, or just a particular par
                            let returnValue = helpers.getScoreByHoleType(scoreForHole, course[holeNumber-2].par);
                            // console.log("dateOfRound: " + round.dateOfRound + " ... holeNumber: " + holeNumber + " ... player: " + playerNumber + " ... returnValue: " + returnValue + " ... scoreForHole: " + scoreForHole + " ... par: " + course[holeNumber-2].par);
                            scoresByHole[holeNumber-2][returnValue][playerNumber-1] += 1;
                        }
                    }
                })
            }
        });
    }
    
    calculateTotals = (scoresByHole, type) => {
        let scoresByHoleTotals = [0,0,0,0];
        scoresByHole.forEach(hole => {
            scoresByHoleTotals = scoresByHoleTotals.SumArray(hole[type]);
        });
        return scoresByHoleTotals;
    }

    render() {
        let rounds;

        let {courses, allRounds} = this.props.appData;

        let courseName = this.props.appData.miscInfo[SELECTED_COURSE];
        let yearOfCompetition = this.props.appData.miscInfo[SELECTED_YEAR];
        let par = this.props.appData.miscInfo[SELECTED_PAR];

        let scoresByHole = this.createEmptyScoresByHoleArray();

        rounds = helpers.getRoundsForSelectedCourseAndYear(allRounds, courses, courseName, yearOfCompetition);

        this.calculateScoresByHole(courses, rounds, scoresByHole, par);

        let scoresByHoleTotals = {
            eagles: this.calculateTotals(scoresByHole, EAGLE),
            birdies: this.calculateTotals(scoresByHole, BIRDIE),
            pars: this.calculateTotals(scoresByHole, PAR),
            bogeys: this.calculateTotals(scoresByHole, BOGEY),
            doubleBogeysOrWorse: this.calculateTotals(scoresByHole, DOUBLE_BOGEY_OR_WORSE),
        }

        return (

            <div className="stats-outer" style={{height: this.state.height + "vh"}}>       {/*Remember to set the style element */}
                
                {/* Add a ref so that the size of the box can be determined and the height in vh units set accordingly */}
                <div className="stats scores-by-hole" ref={el => this.statsBottom = el}>

                    <header className="header narrow">
                        Scores By Hole

                        <span className="title">Course:
                            <SelectCourse
                                courses={courses}
                                selectCourseName={true}
                                courseName={courseName}
                                fieldValue={courseName}
                                updateCourse={this.handleChangeCourse}
                                includeAllCourses={true}
                            />
                        </span>

                        <span className="title">Year:
                            <SelectYearOfCompetition
                                allRounds={allRounds}
                                yearOfCompetition={yearOfCompetition}
                                updateYearOfCompetition={this.handleChangeYearOfCompetition}
                                includeAllYears={true}
                            />
                        </span>

                        <span className="title">Par:
                            <SelectPar
                                par={par}
                                updatePar={this.handleChangePar}
                                includeAllPars={true}
                            />
                        </span>

                    </header>

                    <ScoresByHoleDisplay
                        scoresByHole={scoresByHole}
                        scoresByHoleTotals={scoresByHoleTotals}
                        numberOfRounds={rounds.length}
                    />
                </div>
            </div>
        )
    }

}


const mapStateToProps = (state, ownProps) => ({appData: Object.assign({}, state.appData)})

export default connect(mapStateToProps, null)(ScoresByHole);