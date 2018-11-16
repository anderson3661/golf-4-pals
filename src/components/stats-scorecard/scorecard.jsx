import React, { Component} from 'react';
import { connect } from 'react-redux'

import {PLAYERS_ARRAY, STATS_MIN_VIEWPOINT_HEIGHT} from '../../utilities/constants';
import ScorecardDisplay from './scorecard-display';
import * as helpers from '../../utilities/helper-functions/helpers';
import * as helpersScorecard from '../../utilities/helper-functions/helpers-scorecard';

// import allReports from '../../utilities/data/reports';      //* Don't forget to change when ALL round reports written (or when testing)

const SCORE_EAGLE = "E";
const SCORE_BIRDIE = "B";
const SCORE_PAR = "P";
const SCORE_OTHER = "^";
const NEAREST_THE_PIN = "NTP";
   
class Scorecard extends Component {

    state = { height: STATS_MIN_VIEWPOINT_HEIGHT };

    componentDidMount() {
        helpers.goToTopOfPage();
        helpers.changeViewPortHeightOfStatsElementOnMount(this);
    }

    createScoresAndPointsDisplayArray = (course, playersScores, playersPoints) => {
        let playersScoreForHole;
        let playersTrueScoreForHole;
        let holePar;
        let scoreFormat;
        let scoresAndPoints = [[], [], [], []];
    
        for (let playerNumber = 1; playerNumber <= 4; playerNumber++) {
            for (let holeNumber = 1; holeNumber <= 18; holeNumber++) {
                playersScoreForHole = playersScores[PLAYERS_ARRAY[playerNumber-1]][holeNumber+1];
                playersTrueScoreForHole = helpersScorecard.getTrueScoreForHole(playersScoreForHole);
                holePar = course[holeNumber-1].par;
                if (playersTrueScoreForHole + 2 === holePar) {
                    scoreFormat = SCORE_EAGLE;
                } else if (playersTrueScoreForHole + 1 === holePar) {
                    scoreFormat = SCORE_BIRDIE;
                } else if (playersTrueScoreForHole === holePar) {
                    scoreFormat = SCORE_PAR;
                } else if (playersTrueScoreForHole === 0) {
                    scoreFormat = SCORE_OTHER + "-"
                } else {
                    scoreFormat = SCORE_OTHER;
                }
                if (scoreFormat.length === 1) scoreFormat += playersTrueScoreForHole + "-" + playersPoints[PLAYERS_ARRAY[playerNumber-1]][holeNumber-1];
                scoresAndPoints[playerNumber-1].push(scoreFormat + this.isNTP(playersScoreForHole));
            }
        }
        return scoresAndPoints;
    }

    isNTP = (playersScoreForHole) => {
        return helpers.isNTP(playersScoreForHole) ? " " + NEAREST_THE_PIN : "";
    }

    
    render() {

        let {courses, allRounds, allReports} = this.props.appData;       //* Don't forget to change when ALL round reports written (or when testing)
        // let {courses, allRounds} = this.props.appData;                   //* Don't forget to change when ALL round reports written (or when testing)
        let {yearOfCompetition, roundNumber} = this.props.match.params;

        yearOfCompetition = parseInt(yearOfCompetition, 10);
        roundNumber = parseInt(roundNumber, 10);

        let roundsForYearOfCompetition = helpers.getRoundsForYearOfCompetition(allRounds, yearOfCompetition).roundsForYearOfCompetition;

        let roundSelected = roundsForYearOfCompetition[roundNumber - 1];
        let isMajor = roundSelected.isMajor;

        let course = helpers.getCourse(courses, roundSelected.course);

        let courseParTotals = helpersScorecard.calculateCourseTotals(course.holes, "par");                   // { frontNine: 0, backNine: 0, allHoles: 0 };
        let courseYardageTotals = helpersScorecard.calculateCourseTotals(course.holes, "yardage");           // { frontNine: 0, backNine: 0, allHoles: 0 };
        let playersPoints = helpersScorecard.calculatePointsForPlayers(course.holes, roundSelected);         // [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] x4
        let playersPointsTotals = helpersScorecard.calculatePlayersPointsTotals(playersPoints);              // { frontNine: [0,0,0,0], backNine: [0,0,0,0], allHoles: [0,0,0,0] };
        let winners = helpers.getPositionsOfTotals(playersPointsTotals.allHoles);
        let scoresAndPoints = this.createScoresAndPointsDisplayArray(course.holes, roundSelected, playersPoints);

        let reportsForYearOfCompetition = allReports.filter(reportsForYearOfCompetition => reportsForYearOfCompetition.yearOfCompetition === yearOfCompetition, 10);
        let report = reportsForYearOfCompetition[0].reports[roundNumber - 1];

        return (

            <div className="stats-outer" style={{height: this.state.height + "vh"}}>       {/* Remember to set the style element */}

                {/* Add a ref so that the size of the box can be determined and the height in vh units set accordingly */}
                <div className="report-and-scorecard oom" ref={el => this.statsBottom = el}>
        
                    <ScorecardDisplay        
                        yearOfCompetition={yearOfCompetition}
                        roundNumber={roundNumber}
                        isMajor={isMajor}
                        course={course}
                        courseParTotals={courseParTotals}
                        courseYardageTotals={courseYardageTotals}
                        playersScores={roundSelected}
                        playersPointsTotals={playersPointsTotals}
                        scoresAndPoints={scoresAndPoints}
                        winners={winners}
                        report={report}
                    />

                </div>
            </div>
        )

    }
}


const mapStateToProps = (state, ownProps) => ({appData: Object.assign({}, state.appData)});

export default connect(mapStateToProps, null)(Scorecard);