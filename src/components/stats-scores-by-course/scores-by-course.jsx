import React, { Component } from 'react';
import { connect } from 'react-redux'

import { updateSelectedCourse } from '../../redux/actions';

import {STATS_MIN_VIEWPOINT_HEIGHT} from '../../utilities/constants';
import ScoresByCourseDisplay from './scores-by-course-display';
import * as helpers from '../../utilities/helper-functions/helpers';
import SelectCourse from '../../utilities/helper-functions/select-course';

import './scores-by-course.css';

const SELECTED_COURSE = 'selectedCourseScoresByCourse';

class ScoresByCourse extends Component {

    state = {
        previousCourseName: this.props.appData.miscInfo[SELECTED_COURSE],
        courseName: this.props.appData.miscInfo[SELECTED_COURSE],
        height: STATS_MIN_VIEWPOINT_HEIGHT
    }

    static getDerivedStateFromProps(nextProps, prevState){
        // This React static method getDerivedStateFromProps replaces componentWillReceiveProps from React 16.3 onwards
        // It doesn't have access to this so can't set state etc, only return an object, and then componentDidUpdate is called
        // This function is called when a) the course is changed from within Scores By Courses itself, and b) from a link in Courses Summary
        // Because it is called in more than one place you need the 2 fields in state above.
        if (prevState.courseName !== prevState.previousCourseName) {                    // Applies in case a) above 
            return { courseName: prevState.courseName};
        } else if (nextProps.match.params.courseName && (nextProps.match.params.courseName !== prevState.courseName)) {        // Applies in case b) above 
            return { courseName: nextProps.match.params.courseName};
        } else {
            return { courseName: prevState.courseName};
            // return null;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // This is only called from within the Scores By Course component itself, when then Course Name is re-selected
        helpers.changeViewPortHeightOfStatsElementOnUpdate(this, prevState);
        // This is called after getDerivedStateFromProps above
        // if (prevProps.courseName !== this.props.courseName) {
            // this.updateCourseNameState(this.props.courseName);
        // }
    }

    componentDidMount() {
        // This is called a) when a course is selected from Courses Summary in which case the 2 courseName state values are different (and hence state needs to be updated)
        // and b) from another navigation link in which case the 2 courseName state values are the same
        helpers.goToTopOfPage();
        helpers.changeViewPortHeightOfStatsElementOnMount(this);
        if (this.state.courseName !== this.state.previousCourseName) {
            this.updateCourseNameState(this.state.courseName);
        }
    }

    handleChange = courseName => {
        this.updateCourseNameState(courseName);
    };

    updateCourseNameState(courseName) {
        this.setState({courseName : courseName});
        this.props.dispatch(updateSelectedCourse({[SELECTED_COURSE]: courseName}));
    }

    createScoresByCourseArray(allRounds, courses, courseName) {
        let scoresByCourse = [];
        let roundsForCourse = [];
        // let roundsFiltered = [];
    
        // Need to reverse the array to get the round dates in true descending order
        let allRoundsReversed = [...allRounds].reverse();
    
        allRoundsReversed.forEach((rounds) => {
           
            rounds.roundsForYearOfCompetition.forEach((round, roundNumber) => {
                if (helpers.getCorrectCourseName(courses, round.course) === courseName) {
                    round.yearOfCompetition = rounds.yearOfCompetition;
                    round.roundNumber = roundNumber;
                    roundsForCourse.push(round)
                }
            });
    
            // Can't use filter as need to add yearOfCompetition and roundNumber to the array, so that the coursename hyperlink works
            // roundsFiltered = rounds.roundsForYearOfCompetition.filter(round => round.course === courseName);
            // if (roundsFiltered.length > 0) roundsFiltered.forEach(round => roundsForCourse.push(round));
        });
    
        roundsForCourse.forEach((round) => {
            const stablefordScores = helpers.getStablefordScoresForRound(round);
            const positions = helpers.getPositions(stablefordScores);
            const oomPoints = helpers.getOOMPoints(stablefordScores, positions, round.isMajor);
            const handicaps = helpers.getHandicapsForRound(round);
            const numberOfWins = helpers.getWinners(positions);
    
            scoresByCourse.push({
                yearOfCompetition: round.yearOfCompetition,
                roundNumber: round.roundNumber,
                dateOfRound: helpers.getFormattedDateForRound(0, round.dateOfRound),
                courseName: helpers.getCorrectCourseName(courses, round.course),
                isMajor: round.isMajor,
                oomPoints: oomPoints,
                stablefordScores: stablefordScores,
                positions: positions,
                handicaps: handicaps,
                numberOfWins: numberOfWins
            });
        });
    
        return scoresByCourse;
    }
    

    render() {
        let {courseName} = this.state;
        let {courses, allRounds} = this.props.appData;

        let scoresByCourse = this.createScoresByCourseArray(allRounds, courses, courseName);
        let numberOfWinsTotals = helpers.createTotalsArray(scoresByCourse, "numberOfWins");
        let winners = helpers.getPositionsOfTotals(numberOfWinsTotals);

        return (
            <div className="stats-outer" style={{height: this.state.height + "vh"}}>       {/* Remember to set the style element */}

                {/* Add a ref so that the size of the box can be determined and the height in vh units set accordingly (i.e. really applies when All Years is selected) */}
                <div className="stats scores-by-course" ref={el => this.statsBottom = el}>

                    <header className="header">
                        <span className="title">Scores By Course &nbsp;&nbsp;
                            <SelectCourse
                                courses={courses}
                                selectCourseName={true}
                                courseName={courseName}
                                fieldValue={courseName}
                                updateCourse={this.handleChange}
                            />
                        </span>
                        {courseName && scoresByCourse.length > 0 &&
                            <span
                                className="winners">Best Player{winners.length > 1 ? "s" : ""}&nbsp;&nbsp;&nbsp;
                                {winners.map((player, i) => (<img key={i} className="img-winners" src={helpers.getPlayerImage(player)} alt="" />))}
                            </span>
                        }
                    </header>

                    <ScoresByCourseDisplay
                        courseName = {courseName}
                        scoresByCourse = {scoresByCourse}
                        numberOfWinsTotals = {numberOfWinsTotals}
                    />
                </div>
            </div>
        )
    }

}


const mapStateToProps = (state, ownProps) => ({appData: Object.assign({}, state.appData)});

export default connect(mapStateToProps, null)(ScoresByCourse);