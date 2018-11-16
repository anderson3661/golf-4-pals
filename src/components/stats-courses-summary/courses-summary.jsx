import React, { Component } from 'react';
import { connect } from 'react-redux'

import {PLAYERS_ARRAY, STATS_MIN_VIEWPOINT_HEIGHT} from '../../utilities/constants';            //Used for looping purposes only
import CoursesSummaryDisplay from './courses-summary-display';
import * as helpers from '../../utilities/helper-functions/helpers';

class CoursesSummary extends Component {

    state = { height: STATS_MIN_VIEWPOINT_HEIGHT };

    getCourses(courses) {
        return courses.map(course => course.courseName).sort((a, b) => a.localeCompare(b));
    }   
    
    createWinsByCourseArray(allCourses) {
        let winsByCourse = [];
    
        allCourses.forEach(courseName => {
            winsByCourse.push({
                courseName: courseName,
                roundsPlayed: 0,
                majorsPlayed: 0,
                wins: [0,0,0,0],
                winsInMajors: [0,0,0,0],
            });
        });
    
        return winsByCourse;
    }
    
    populateWinsByCourseArray(winsByCourse, allRounds, courses) {
    
        allRounds.forEach((rounds) => {
            rounds.roundsForYearOfCompetition.forEach(round => {
                const courseIndex = helpers.getPositionInArrayOfObjects(winsByCourse, "courseName", helpers.getCorrectCourseName(courses, round.course));
                if(courseIndex >= 0) {
                    const stablefordScores = helpers.getStablefordScoresForRound(round);
                    const positions = helpers.getPositions(stablefordScores);
                    winsByCourse[courseIndex].roundsPlayed++;
                    if (round.isMajor) winsByCourse[courseIndex].majorsPlayed++;
                    PLAYERS_ARRAY.forEach((player, playerNumber) => {
                        if (positions[playerNumber] === 1) {
                            winsByCourse[courseIndex].wins[playerNumber]++;
                            if (round.isMajor) winsByCourse[courseIndex].winsInMajors[playerNumber]++;
                        }
                    });
                }
            });
        });
    
    }

    componentDidMount() {
        helpers.goToTopOfPage();
        helpers.changeViewPortHeightOfStatsElementOnMount(this);
    }

    componentDidUpdate(prevProps, prevState) {
        helpers.changeViewPortHeightOfStatsElementOnUpdate(this, prevState);
    }


    render() {
        let {courses, allRounds} = this.props.appData;
        
        let allCourses = this.getCourses(courses).filter((v, i, a) => a.indexOf(v) === i);
        let winsByCourse = this.createWinsByCourseArray(allCourses);
        this.populateWinsByCourseArray(winsByCourse, allRounds, courses);

        let grandTotals = {
            roundsPlayed: winsByCourse.map(item => item.roundsPlayed).reduce((prev, next) => prev + next, 0),
            majorsPlayed: winsByCourse.map(item => item.majorsPlayed).reduce((prev, next) => prev + next, 0),
            numberOfWinsTotals: helpers.createTotalsArray(winsByCourse, "wins"),
            numberOfWinsInMajorsTotals: helpers.createTotalsArray(winsByCourse, "winsInMajors")
        }

        return (
            <div className="stats-outer" style={{height: this.state.height + "vh"}}>       {/* Remember to set the style element */}

                {/* Add a ref so that the size of the box can be determined and the height in vh units set accordingly */}
                <div className="stats courses-summary" ref={el => this.statsBottom = el}>

                    <header className="header">
                        <span>Courses Summary</span>
                    </header>

                    <CoursesSummaryDisplay
                        winsByCourse = {winsByCourse}
                        grandTotals = {grandTotals}
                    />
                </div>

            </div>
        )
    }

}


const mapStateToProps = (state, ownProps) => ({appData: Object.assign({}, state.appData)});

export default connect(mapStateToProps, null)(CoursesSummary);
