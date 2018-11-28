import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import ReactHtmlParser from 'react-html-parser';

import { updateSelectedYear } from '../../redux/actions';

import {VISIBILITY_VISIBLE, VISIBILITY_HIDDEN} from '../../utilities/constants';
import * as helpers from '../../utilities/helper-functions/helpers';
import images from '../../utilities/data/images';
import SelectYearOfCompetition from '../../utilities/helper-functions/select-year-of-competition';
import OrderOfMeritTable from './order-of-merit-table';
import ScrollToTopOfPage from './scroll-to-top-of-page';

import "../../utilities/css/scroll-help.scss";
import './story-of-the-season.scss';

const SELECTED_YEAR = 'selectedYearStoryOfTheSeason';


class StoryOfTheSeason extends Component {

    numberOfRenders = 0;
    roundsForSelectedYearOfCompetition;
    randomImagesForRounds = [];

    constructor(props) {
        super(props);
        this.state = {
            currentRoundNumber: 1,
            visibility: VISIBILITY_VISIBLE,
            goToTopVisibility: VISIBILITY_HIDDEN,
            intervalId: 0
        }
        this.handleScroll = this.handleScroll.bind(this);

        // Get random images for the course of each round.  Do it in the constructor and on change of year, so that the images are not re-calculated on each render
        this.getRandomImagesForRounds();
    }

    handleChange = yearOfCompetition => {
        this.getRandomImagesForRounds(yearOfCompetition);
        this.props.dispatch(updateSelectedYear({[SELECTED_YEAR]: yearOfCompetition}));
    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(e) {
        let numberOfRoundsForSelectedYearOfCompetition = this.getRoundsForSelectedYearOfCompetition().length;

        for (let i = 1; i <= numberOfRoundsForSelectedYearOfCompetition; i++) {
            let viewportOffset = this["roundNumberReport" + i].getBoundingClientRect();
            // console.log("viewportOffset" + i, Math.round(viewportOffset.top, 0));
            
            if (Math.round(viewportOffset.top, 0) >= 0 && Math.round(viewportOffset.top, 0) <= 500) {
                if (this.state.currentRoundNumber !== i) {
                    this.setState({currentRoundNumber: i});
                }
            }
        };
        
        let visibility = (window.pageYOffset < 200) ? VISIBILITY_VISIBLE : VISIBILITY_HIDDEN;
        let goToTopVisibility = (window.pageYOffset > 500) ? VISIBILITY_VISIBLE : VISIBILITY_HIDDEN;

        if (visibility !== this.state.visibility) {
            this.setState({visibility: visibility});
        }

        if (goToTopVisibility !== this.state.goToTopVisibility) {
            this.setState({goToTopVisibility: goToTopVisibility});
        }
    }

    getRoundsForSelectedYearOfCompetition = (yearOfCompetition = this.props.appData.miscInfo[SELECTED_YEAR]) => {
        let {allRounds} = this.props.appData;
        let roundsForYear = allRounds.filter(roundsForYearOfCompetition => roundsForYearOfCompetition.yearOfCompetition === yearOfCompetition);
        return roundsForYear[0].roundsForYearOfCompetition;
    }

    getRandomImagesForRounds(yearOfCompetition = this.props.appData.miscInfo[SELECTED_YEAR]) {
        this.randomImagesForRounds = [];
        let {courses} = this.props.appData;
        // this.roundsForSelectedYearOfCompetition = this.getRoundsForSelectedYearOfCompetition();
        this.roundsForSelectedYearOfCompetition = this.getRoundsForSelectedYearOfCompetition(yearOfCompetition);
        this.roundsForSelectedYearOfCompetition.forEach(round => {
            let correctCourseName = helpers.getCorrectCourseName(courses, round.course);
            let imagesForCourse = helpers.getImagesForCourse(images, correctCourseName);
            let randomImageNumber = Math.round(Math.random() * (imagesForCourse.length - 1), 0);
            this.randomImagesForRounds.push(imagesForCourse[randomImageNumber]);
        });
    }

    getImageStyle(roundNumber, minimumHeight) {
        return {
            backgroundImage: `url(${ this.randomImagesForRounds[roundNumber] })`,
            minHeight: `${minimumHeight}vh`,
        }
    }

    render() {
        let oom;

        let {courses, allRounds, allReports} = this.props.appData;
        let yearOfCompetition = this.props.appData.miscInfo[SELECTED_YEAR];
        let roundsForYear = allRounds.filter(roundsForYearOfCompetition => roundsForYearOfCompetition.yearOfCompetition === yearOfCompetition);
        let isSeasonCompleted = roundsForYear[0].isSeasonCompleted;
        let reportsForYearOfCompetition = allReports.filter(reportsForYearOfCompetition => reportsForYearOfCompetition.yearOfCompetition === yearOfCompetition);

        oom = helpers.createOOMArray(courses, roundsForYear[0].roundsForYearOfCompetition, yearOfCompetition);
        let oomPointsTotalsFinal = helpers.createTotalsArray(oom, "oomPoints");
        
        let {currentRoundNumber} = this.state;
        
        // Get total points for the currently displayed round
        oom = helpers.createOOMArray(courses, roundsForYear[0].roundsForYearOfCompetition.slice(currentRoundNumber-1, currentRoundNumber), yearOfCompetition);
        let oomPointsTotalsCurrentRound = helpers.createTotalsArray(oom, "oomPoints");

        // Get total points for all rounds up to and including the currently displayed round
        oom = helpers.createOOMArray(courses, roundsForYear[0].roundsForYearOfCompetition.slice(0, currentRoundNumber), yearOfCompetition);
        let oomPointsTotalsCurrentRoundsCumulative = helpers.createTotalsArray(oom, "oomPoints");

        let oomPointsTotals = {final: oomPointsTotalsFinal, currentRound: oomPointsTotalsCurrentRound, currentRoundsCumulative: oomPointsTotalsCurrentRoundsCumulative};

        return (

            <Fragment>

                <div className="container-sots-and-oom">

                    <div className="container-sots">

                        {/* <h1 className="page-header">
                            Story of the Season &nbsp;&nbsp;<SelectYearOfCompetition yearOfCompetition={yearOfCompetition} updateYearOfCompetition={this.handleChange} />
                        </h1> */}

                        <div className="img-main1">
                            <div className="img-text mainHeader">
                                <span>Story of the Season</span>
                                <SelectYearOfCompetition
                                    allRounds={allRounds}
                                    yearOfCompetition={yearOfCompetition}
                                    updateYearOfCompetition={this.handleChange}
                                />
                            </div>
                            <div className={`scroll-help ${this.state.visibility}`}>
                                <div className="image">
                                    <span>Scroll down to view more</span>
                                </div>
                                <div className="indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>

                        {reportsForYearOfCompetition[0].reports.map((report, roundNumber) => {

                            if (roundNumber <= roundsForYear[0].roundsForYearOfCompetition.length) {

                                let round = roundsForYear[0].roundsForYearOfCompetition[roundNumber];

                                let correctCourseName = helpers.getCorrectCourseName(courses, round.course)

                                return (
                                    <Fragment key={roundNumber}>

                                        <section
                                            className={roundNumber % 2 === 0 ? "section section-light" : "section section-dark"}
                                            ref={el => this["roundNumberReport" + (roundNumber + 1)] = el}
                                            onScroll={this.handleScroll}>
                                            <div className="inner">
                                                <div className="details">
                                                    <p className="details-round">Round {roundNumber + 1}</p>
                                                    <div className="container-golfball">
                                                        <img className="golfball" src={helpers.getImage(images, "miscellaneous", "Golf Ball")} alt="" />
                                                        <p className="details-course">{correctCourseName}</p>
                                                    </div>
                                                    <p className="details-date">{helpers.formatDate(round.dateOfRound)}</p>
                                                    <p className="details-scorecard"><NavLink to={`/scorecard/${round.yearOfCompetition}/${roundNumber + 1}`}>Scorecard</NavLink></p>
                                                    <p className="details-actual-scorecard"><a href = {helpers.getActualScorecard(yearOfCompetition, roundNumber + 1)} target = "_blank" rel="noopener noreferrer">Actual Scorecard</a></p>
                                                </div>
                                                <div className="round-summary">
                                                    <h2 className="heading">{report.heading}</h2>
                                                    <div>{ReactHtmlParser(report.commentary)}</div>
                                                </div>                                            
                                            </div>
                                        </section>

                                        <div style={this.getImageStyle(roundNumber, 60)} className="courseImages">
                                            <span className="img-text transparent">{correctCourseName}</span>
                                        </div>

                                    </Fragment>
                                );

                            }

                            return null;

                        })}

                        <section className="section section-dark"></section>

                        <div className="img-main2">
                            <span className="img-text">Story of the Season
                                {/* &nbsp;&nbsp; */}
                                {/* <SelectYearOfCompetition
                                    allRounds={allRounds}
                                    yearOfCompetition={yearOfCompetition}
                                    updateYearOfCompetition={this.handleChange}
                                /> */}
                            </span>
                        </div>

                        <div className={`goToTopOfPage ${this.state.goToTopVisibility}`}>
                            <ScrollToTopOfPage scrollStepInPx="250" delayInMs="15"/>
                        </div>

                    </div>

                    <div className={`oom-position${isSeasonCompleted ? '' : ' currentSeason'}`}>

                        <OrderOfMeritTable
                            yearOfCompetition={yearOfCompetition}
                            oomPointsTotals={oomPointsTotals}
                            isSeasonCompleted={isSeasonCompleted}
                            isCurrentTable={true}
                            currentRoundNumber={currentRoundNumber}
                        />

                        {isSeasonCompleted &&
                            <OrderOfMeritTable
                                yearOfCompetition={yearOfCompetition}
                                oomPointsTotals={oomPointsTotals}
                                isSeasonCompleted={isSeasonCompleted}
                                isCurrentTable={false}
                                currentRoundNumber={0}
                            />
                        }

                    </div>

                </div>

            </Fragment>
        )
    }

}

// function offset(el) {
//     var rect = el.getBoundingClientRect(),
//     scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
//     scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
// }

const mapStateToProps = (state, ownProps) => ({appData: Object.assign({}, state.appData)})

export default connect(mapStateToProps, null)(StoryOfTheSeason);