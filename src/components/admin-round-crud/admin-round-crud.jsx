import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Prompt } from 'react-router';

import { createRound, updateRound, deleteRound } from '../../redux/actions';

import {TESTING_MODE, PLAYERS_ARRAY, HOLES, EMPTY_TOTALS, HANDICAP_ELEMENT, STATS_MIN_VIEWPOINT_HEIGHT} from '../../utilities/constants';
import * as helpers from '../../utilities/helper-functions/helpers';
import * as helpersScorecard from '../../utilities/helper-functions/helpers-scorecard';
import FieldInput from '../../utilities/helper-functions/admin-crud-field-input';
import DisplayTotals from '../../utilities/helper-functions/admin-crud-display-totals';
import Button from "@material-ui/core/Button";

import SelectCourse from '../../utilities/helper-functions/select-course';
import SelectDateOfRound from '../../utilities/helper-functions/select-date-of-round';
import ConfirmationDialog from '../dialogs/confirmationDialog';
import ConfirmYesNo from '../dialogs/confirmYesNo';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import '../stats-scorecard/scorecard.css';
import './admin-round-crud.css';

const EMPTY_STATE = {
    dialogSaveIsOpen: false,
    dialogDeleteYesNoIsOpen: false,
    dialogDeleteYesSelected: false,
    dialogDeleteConfirmIsOpen: false,
    reportHeading: "",
    reportCommentary: "",
    courseName: "",
    courseVariation: "",
    dateOfRound: "",
    isMajor: false,
    holeNames: new Array(18).fill(""),
    pars: new Array(18).fill(""),
    yardages: new Array(18).fill(""),
    strokeIndexes: new Array(18).fill(""),
    dave: new Array(20).fill(""),
    jack: new Array(20).fill(""),
    martin: new Array(20).fill(""),
    steve: new Array(20).fill("")
}

class AdminRoundCRUD extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ...EMPTY_STATE,
            isCreate: props.isCreate,
            isUpdate: props.isUpdate,
            isDelete: props.isDelete,
            height: STATS_MIN_VIEWPOINT_HEIGHT
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handlePopulate = this.handlePopulate.bind(this);
        this.handlePopulateRounds = this.handlePopulateRounds.bind(this);
        this.handleDialogCloseSave = this.handleDialogCloseSave.bind(this);
        this.handleDialogYesNoCloseDelete = this.handleDialogYesNoCloseDelete.bind(this);
        this.handleDialogConfirmCloseDelete = this.handleDialogConfirmCloseDelete.bind(this);
    }

    haveChangesBeenMade = () => {
        return (
            this.state.reportHeading.trim() !== "" ||
            this.state.reportCommentary.trim() !== "" ||
            this.state.courseName.trim() !== "" ||
            this.state.courseVariation.trim() !== "" ||
            this.state.dave.join("") !== "" ||
            this.state.jack.join("") !== "" ||
            this.state.martin.join("") !== "" ||
            this.state.steve.join("") !== ""
        );
    }

    handleChangeReportHeading = (reportHeading) => {
        this.setState({ reportHeading: reportHeading });
    };

    handleChangeReportCommentary = (reportCommentary) => {
        this.setState({ reportCommentary: reportCommentary });
    };

    handleChangeCourseName = (courseName) => {
        this.setState({ courseName: courseName });
        this.updateAfterCourseSelection(courseName, "");
    };

    handleChangeCourseVariation = (courseName, courseVariation) => {
        this.props.isCreate && this.setState({ courseVariation: courseVariation });
        this.updateAfterCourseSelection(courseName, courseVariation);
    };
    
    updateAfterCourseSelection(courseName, courseVariation) {
        let course;
        
        course = helpers.getCourse(this.props.appData.courses, courseName, courseVariation);
        courseVariation = ((courseVariation === "" && course.courseVariation !== "") ? course.courseVariation : courseVariation);
        
        this.setState({ courseVariation: courseVariation });
        this.setState({ holeNames: course.holes.map((hole, holeNumber) => hole.holeName)});
        this.setState({ pars: course.holes.map((hole, holeNumber) => hole.par)});
        this.setState({ yardages: course.holes.map((hole, holeNumber) => hole.yardage)});
        this.setState({ strokeIndexes: course.holes.map((hole, holeNumber) => hole.strokeIndex)});
    }
    
    handleChangeDateOfRound = (dateOfRound) => {
        let {isUpdate, isDelete} = this.props;
        let {allRounds, allReports} = this.props.appData;
        let {courseName, courseVariation} = this.state;

        this.setState({ dateOfRound: dateOfRound });

        if ((isUpdate || isDelete) && courseName !== "" && dateOfRound !== "") {
            let round = helpers.getSelectedRound(allRounds, courseName, courseVariation, dateOfRound);
            this.setState({ isMajor: round.isMajor });
            PLAYERS_ARRAY.forEach(player => {
                this.setState({ [player]: round[player].map(score => score)});
            });

            let report = allReports[round.yearOfCompetitionArrayElementNumber].reports[round.roundArrayElementNumber];
            this.setState({ reportHeading: report.heading });
            this.setState({ reportCommentary: report.commentary });
        }
    };
    
    handleChangePlayersScores = (element, elementNumber, newValue) => {
        this.setState(prevState => ({[element]: this.getNewArray(prevState, element, elementNumber, newValue)}));
    };

    getNewArray = (prevState, element, elementNumber, newValue) => {
        let elementLength = (elementNumber === 0 ? 2 : 1)       // Maximum length of field is 2 for handicaps and 1 for players scores
        newValue = newValue.trim();
        if (isNaN(newValue.slice(newValue.length-1, 1))) newValue = newValue.slice(0, newValue.length-1);   // If the last character is not a number then remove it
        if (newValue.length > elementLength) newValue = newValue.slice(0, elementLength);                   // If the number of characters is greater than allowed (i.e. pars = 1 character) then remove
        if (newValue !== "") newValue = parseInt(newValue, 10);                                             // If the value is not an empty string then convert to a number
        
        return helpers.updateElementInArray(prevState[element], elementNumber, newValue);
    };

    handleSave = (e) => {
        console.log(this.state);

        // e.preventDefault();
        
        let {isCreate, isUpdate, isDelete} = this.props;
        let {courses, allRounds} = this.props.appData;
        let {reportHeading, reportCommentary, courseName, courseVariation, dateOfRound, isMajor, dave, jack, martin, steve} = this.state;

        if (this.validateAdminRoundCRUD()) return;
        
        this.setState({dialogSaveIsOpen: true});

        courseName = courseName.trim();
        courseVariation = courseVariation.trim();

        // Populate array element 2 of the players arrays, which contains the order of merit points totals
        let course = helpers.getCourse(courses, courseName, courseVariation);
        let playersPoints = helpersScorecard.calculatePointsForPlayers(course.holes, {dave, jack, martin, steve});
        let playersPointsTotals = helpersScorecard.calculatePlayersPointsTotals(playersPoints);        
        
        let data = {
            report: {
                heading: reportHeading,
                commentary: reportCommentary
            },
            round: {
                dateOfRound: dateOfRound.trim(),
                course: courseVariation !== "" ? courseVariation : courseName,
                isMajor: isMajor,
                dave: dave,
                jack: jack,
                martin: martin,
                steve: steve
            }
        }
        
        // Now add the Stableford Scores for each player to the data array
        PLAYERS_ARRAY.forEach((player, playerNumber) => data.round[player][1] = playersPointsTotals.allHoles[playerNumber]);

        if (isCreate) {
            this.props.dispatch(createRound(data));
        } else if (isUpdate) {
            let roundDetails = helpers.getRoundArrayDetails(allRounds, courseName, courseVariation, dateOfRound);
            if (roundDetails.elementNumberYearOfCompetition >= 0 && roundDetails.elementNumberRound >= 0) {
                this.props.dispatch(updateRound({round: {...data}, roundDetails: roundDetails}));
            }
        }

        // Clear the form, but specify dialogSaveIsOpen = true, so that the 'Changes Saved' dialog appears
        this.setState({...EMPTY_STATE, dialogSaveIsOpen: true, isCreate: isCreate, isUpdate: isUpdate, isDelete: isDelete});

    };

    handleDialogCloseSave = () => {
        this.setState({ dialogSaveIsOpen: false })
    }

    handleDelete = () => {
        if (this.validateAdminRoundCRUD()) return;
        this.setState({dialogDeleteYesNoIsOpen: true});
    }

    handleDialogYesNoCloseDelete = (value) => {
        let {allRounds} = this.props.appData;
        let {courseName, courseVariation, dateOfRound} = this.state;

        this.setState({ dialogDeleteYesSelected: value, dialogDeleteYesNoIsOpen: false }, () => {
            if (this.state.dialogDeleteYesSelected) {
                let roundDetails = helpers.getRoundArrayDetails(allRounds, courseName, courseVariation, dateOfRound);
                if (roundDetails.elementNumberYearOfCompetition >= 0 && roundDetails.elementNumberRound) {
                    this.props.dispatch(deleteRound({roundDetails: roundDetails}));

                    // Clear the form, but specify dialogDeleteConfirmIsOpen = true, so that the 'Course has been deleted' dialog appears
                    this.setState({...EMPTY_STATE, dialogDeleteConfirmIsOpen: true, isCreate: this.props.isCreate, isUpdate: this.props.isUpdate, isDelete: this.props.isDelete});
                }
            }
        });
    }

    handleDialogConfirmCloseDelete = () => {
        this.setState({ dialogDeleteConfirmIsOpen: false })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // If the user changes the navigation from New Course to Edit Course, or visa-versa then need to blank out the form
        if (nextProps.isCreate && (prevState.isUpdate || prevState.isDelete)) {
            return {...EMPTY_STATE, isCreate: true, isUpdate: false, isDelete: false};
        } else if (nextProps.isUpdate && (prevState.isCreate || prevState.isDelete)) {
            return {...EMPTY_STATE, isCreate: false, isUpdate: true, isDelete: false};
        } else if (nextProps.isDelete && (prevState.isCreate || prevState.isUpdate)) {
            return {...EMPTY_STATE, isCreate: false, isUpdate: false, isDelete: true};
        } else {
            return null;
        }
    }

    handleChangeIsMajor(e) {
        this.setState({isMajor: e.target.checked})
    }

    validateAdminRoundCRUD = () => {
        let validationWarnings = "";
    
        let {reportHeading, reportCommentary, courseName, courseVariation, dateOfRound, isCreate, isUpdate, isDelete} = this.state;
        let {allRounds} = this.props.appData;
    
        // Validate data
        if (!courseName) validationWarnings += `- Course Name must be ${isCreate ? 'entered' : 'selected'}`;

        if ((isUpdate || isDelete) && dateOfRound === "") {
            validationWarnings += "\n- Date Of Round must be selected";
        }

        if (isCreate && !helpers.isDateValid(dateOfRound)) {
            validationWarnings += "\n- Invalid date ... please enter in dd/mm/yyyy format";
        }

        if (isCreate && helpers.getRoundArrayDetails(allRounds, courseName, courseVariation, dateOfRound).elementNumberRound !== -1) {
            validationWarnings += "\n- A round already exists for this date";
        }
    
        if (isCreate || isUpdate) {
            PLAYERS_ARRAY.forEach(player => {
                if (!helpers.areAllArrayValuesEntered(this.state[player])) validationWarnings += `\n- Scores must be entered for ${player.toProperCase()} for all holes (use 0 for no score)`;
            });
        }

        if (isCreate || isUpdate) {
            if (!reportHeading) validationWarnings += '\n- Report Heading must be entered';
            if (!reportCommentary) validationWarnings += '\n- Report must be entered';
        }

        let yearOfCompetitionDetailsFromDateOfRound = helpers.getYearOfCompetitionDetailsFromDateOfRound(allRounds, courseName, courseVariation, dateOfRound);
        if (yearOfCompetitionDetailsFromDateOfRound.isSeasonCompleted) {
            validationWarnings += `\n- Cannot delete this round as the ${yearOfCompetitionDetailsFromDateOfRound.yearOfCompetition} order of merit has finished`;
        }
    
        if (validationWarnings) {
            alert('Cannot save ... please correct the following and retry ...\n\n' + validationWarnings);
        }
    
        return validationWarnings;
    }

    // Only applicable for type = isCreate, and only for testing purposes
    handlePopulate = () => {
        if (!this.state.dateOfRound) this.setState({dateOfRound: new Date().toLocaleDateString("en-GB")});
        
        PLAYERS_ARRAY.forEach(player => {

            // Get random scores for all holes, including the first array element which is handicap, but if a score has already been entered then use that value
            let randomScoresForPlayer = this.state[player].map((score, holeNumber) => {
                return score ? score : (holeNumber === 0 ? Math.round((Math.random() * 15) + 10, 0) : (holeNumber > 1 ? Math.round((Math.random() * 2) + 3, 0) : 0));
            });

            this.setState({[player]: randomScoresForPlayer});
        });

        this.setState({reportHeading: "Test Heading"});
        this.setState({reportCommentary: "Test A\nTest B"});
    }

    // Only applicable for type = isCreate, and only for testing purposes
    handlePopulateRounds = () => {
        let {courses, allReports} = this.props.appData;

        for (let i=0; i<13; i++) {

            let randomScoresForPlayers = PLAYERS_ARRAY.map(player => {  
                return this.state[player].map((score, holeNumber) => {
                    return score ? score : (holeNumber === 0 ? Math.round((Math.random() * 15) + 10, 0) : (holeNumber > 1 ? Math.round((Math.random() * 2) + 3, 0) : 0));
                });
            });

            randomScoresForPlayers = {dave: randomScoresForPlayers[0], jack: randomScoresForPlayers[1], martin: randomScoresForPlayers[2], steve: randomScoresForPlayers[3]};

            let roundNumber = allReports[0].reports.length + (i + 1);
            let courseNumber = (roundNumber >= courses.length ? courses.length - 1 : roundNumber);
            let currentDate = new Date();
            let roundDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate() + i + 1);

            let playersPoints = helpersScorecard.calculatePointsForPlayers(courses[courseNumber].holes, randomScoresForPlayers);
            let playersPointsTotals = helpersScorecard.calculatePlayersPointsTotals(playersPoints);

            PLAYERS_ARRAY.forEach((player, i) => randomScoresForPlayers[player][1] = playersPointsTotals.allHoles[i]);

            let data = {
                report: {
                    heading: "Test Heading for round " + roundNumber,
                    commentary: `<p>Test Para A for round ${roundNumber}</p>
                                <p>Test Para B for round ${roundNumber}</p>
                                `
                },
                round: {
                    dateOfRound: roundDate.toLocaleDateString("en-GB"),
                    course: courses[courseNumber].courseVariation ? courses[courseNumber].courseVariation : courses[courseNumber].courseName,
                    isMajor: false,
                    dave: randomScoresForPlayers.dave,
                    jack: randomScoresForPlayers.jack,
                    martin: randomScoresForPlayers.martin,
                    steve: randomScoresForPlayers.steve
                }
            }
    
            this.props.dispatch(createRound(data));
        }

    }

    componentDidMount() {
        helpers.goToTopOfPage();
        helpers.changeViewPortHeightOfStatsElementOnMount(this);
    }

    componentDidUpdate(prevProps, prevState) {
        helpers.changeViewPortHeightOfStatsElementOnUpdate(this, prevState);
    }


    render() {
        let holeNumber;
        let course;
        let courseParTotals;
        let courseYardageTotals;
        let playersPoints;
        
        let {isCreate, isUpdate, isDelete} = this.props;
        let {courses, allRounds} = this.props.appData;
        let {reportHeading, reportCommentary, courseName, courseVariation, dateOfRound, isMajor, dave, jack, martin, steve} = this.state;

        if ((isUpdate || isDelete) && courseName !== "") course = helpers.getCourse(courses, courseName, courseVariation);

        if (courseName !== "") {
            course = helpers.getCourse(courses, courseName, courseVariation);
            courseParTotals = helpersScorecard.calculateCourseTotals(course.holes, "par");                   // { frontNine: 0, backNine: 0, allHoles: 0 };
            courseYardageTotals = helpersScorecard.calculateCourseTotals(course.holes, "yardage");           // { frontNine: 0, backNine: 0, allHoles: 0 };
            let playersScores = {dave: dave, jack: jack, martin: martin, steve: steve};
            playersPoints = helpersScorecard.calculatePointsForPlayers(course.holes, playersScores);
        } else {
            courseParTotals = EMPTY_TOTALS;
            courseYardageTotals = EMPTY_TOTALS;
            playersPoints = helpersScorecard.getZeroPlayersPointsArrays();
        }

        return (

            <div className="stats-outer" style={{height: this.state.height + "vh"}}>       {/* Remember to set the style element */}

                <div className="report-and-scorecard admin-round-crud">

                    {/* Add a ref so that the size of the box can be determined and the height in vh units set accordingly */}
                    {/* <div className="stats scorecard admin-round-crud" ref={el => this.statsBottom = el}> */}
                    <div className="stats scorecard admin-round-crud">

                        <div className="admin-round-crud-inner">

                            <Prompt when={this.haveChangesBeenMade()} message={`Are you sure you want to abandon ${isDelete ? 'this undeleted course' : 'these unsaved changes'} ?`} />

                            <header className="header narrow">
                                <span className="title">Course Name:
                                    <SelectCourse
                                        courses={courses}
                                        selectCourseName={true}
                                        courseName={courseName}
                                        fieldValue={courseName}
                                        updateCourse={this.handleChangeCourseName}
                                    />
                                </span>
                                <span className="title">Course Variation:
                                    <SelectCourse
                                        courses={courses}
                                        selectCourseName={false}
                                        courseName={courseName}
                                        fieldValue={courseVariation}
                                        updateCourse={this.handleChangeCourseVariation.bind(this, courseName)}
                                    />
                                </span>
                                {isCreate &&
                                    <span className="title">Date Of Round:
                                        <FieldInput
                                            type="text"
                                            name="dateOfRound"
                                            isNumeric={false}
                                            value={dateOfRound}
                                            updateArray={this.handleChangeDateOfRound}
                                        />
                                    </span>
                                }
                                {(isUpdate || isDelete) &&
                                    <span className="title">Date Of Round:
                                        <SelectDateOfRound
                                            courses={courses}
                                            courseName={courseName}
                                            allRounds={allRounds}
                                            dateOfRound={dateOfRound}
                                            updateDateOfRound={this.handleChangeDateOfRound}
                                        />
                                    </span>
                                }
                                {(isCreate || isUpdate) &&
                                    <span className="isMajor">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={isMajor}
                                                    onChange={this.handleChangeIsMajor.bind(this)}
                                                    value={isMajor.toString()}
                                                />
                                            }
                                            label="Major ?"
                                            labelPlacement='start'
                                        />                        
                                    </span>
                                }
                            </header>

                            <table className="scorecard">

                                <colgroup>
                                    <col />
                                        <col />
                                        <col />
                                        <col className="yards" />
                                    <col />
                                </colgroup>

                                <thead>
                                    <tr className="headings">
                                        <th className="holeNumber">Hole</th>
                                        <th className="holeName">Name</th>
                                        <th className="par">Par</th>
                                        <th className="yardage">Yellow Yards</th>
                                        <th className="strokeIndex">Stroke Index</th>
                                        {PLAYERS_ARRAY.map((player, playerNumber) => {
                                            return (
                                                <th
                                                    key={playerNumber}
                                                    className="names">{player.toProperCase()}
                                                    {'\n'}

                                                    {isDelete ?
                                                        <span>{this.state[player][HANDICAP_ELEMENT]}</span>
                                                    :
                                                        <Fragment>
                                                            <span className="handicap">Handicap&nbsp;</span>
                                                            <FieldInput
                                                                type="text"
                                                                name="handicaps"
                                                                isNumeric={true}
                                                                value={this.state[player][HANDICAP_ELEMENT]}
                                                                updateArray={this.handleChangePlayersScores.bind(this, player, HANDICAP_ELEMENT)}
                                                            />
                                                        </Fragment>
                                                    }

                                                </th>
                                            )
                                        })}
                                    </tr>
                                </thead>

                                <tbody>

                                    {HOLES.map((hole, i) => {

                                        holeNumber = i + 1;

                                        return (
                                            <Fragment key={i}>

                                                {holeNumber === 10 &&
                                                    <DisplayTotals
                                                        className="subTotalsRow"
                                                        rowTitle="OUT"
                                                        holesType="frontNine"
                                                        courseParTotals={courseParTotals}
                                                        courseYardageTotals={courseYardageTotals}
                                                        playersPoints={playersPoints}
                                                        state={this.state}
                                                        includePlayersPointsTotals
                                                    />
                                                }

                                                <tr className="hole">

                                                    <td>{holeNumber}</td>
                                                    <td>{courseName !== "" && course.holes[holeNumber-1].holeName}</td>
                                                    <td>{courseName !== "" && course.holes[holeNumber-1].par}</td>
                                                    <td>{courseName !== "" && course.holes[holeNumber-1].yardage}</td>
                                                    <td className="strokeIndex">{courseName !== "" && course.holes[holeNumber-1].strokeIndex}</td>

                                                    {PLAYERS_ARRAY.map((player, playerNumber) => {
                                                            
                                                        let classNameForScoreOnHole = (courseName !== "" ?
                                                            helpers.getClassNameForScoreOnHole(this.state[player][holeNumber + 1], course.holes[holeNumber-1].par) : "");

                                                        return (

                                                            isDelete ?

                                                                <td key={playerNumber} className={classNameForScoreOnHole}>
                                                                {this.state[player][holeNumber + 1] + " - " + playersPoints[player][holeNumber - 1]}
                                                                </td>

                                                            :

                                                                <td key={playerNumber} className={classNameForScoreOnHole}>
                                                                    <FieldInput
                                                                        type="text"
                                                                        name="names"
                                                                        holeNumber={holeNumber}
                                                                        isNumeric={true}
                                                                        value={this.state[player][holeNumber + 1]}
                                                                        updateArray={this.handleChangePlayersScores.bind(this, player, holeNumber + 1)}
                                                                    />
                                                                    {this.state[player][holeNumber + 1] !== 0 && (" - " + playersPoints[player][holeNumber - 1])}
                                                                </td>
                                                        )
                                                    })}

                                                </tr>

                                            </Fragment>
                                        )
                                    })}

                                    <DisplayTotals
                                        className="subTotalsRow"
                                        rowTitle="IN"
                                        holesType="backNine"
                                        courseParTotals={courseParTotals}
                                        courseYardageTotals={courseYardageTotals}
                                        playersPoints={playersPoints}
                                        state={this.state}
                                        includePlayersPointsTotals
                                    />

                                    <DisplayTotals
                                        className="totalsRow"
                                        rowTitle="TOTAL"
                                        holesType="allHoles"
                                        courseParTotals={courseParTotals}
                                        courseYardageTotals={courseYardageTotals}
                                        playersPoints={playersPoints}
                                        state={this.state}
                                        includePlayersPointsTotals
                                    />

                                    <tr className="key">
                                        <td colSpan="5"></td>
                                        <td colSpan="4">Colour Key: <span className="key-par">Par</span><span className="key-birdie">Birdie</span><span className="key-eagle">Eagle</span></td>
                                    </tr>

                                </tbody>

                            </table>

                        </div>
                            
                    </div>

                    <div className="report">

                        <h2 className="heading">Round Report</h2>

                        <table>

                            <tbody>

                                <tr className="reportHeadingRow">
                                    <td className="label">Heading:</td>
                                    <td>
                                        <FieldInput
                                            type="text"
                                            name="reportHeading"
                                            isNumeric={false}
                                            value={reportHeading}
                                            updateReportHeading={this.handleChangeReportHeading}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td className="label">Report:</td>
                                    <td>
                                        <FieldInput
                                            type="text"
                                            name="reportCommentary"
                                            isNumeric={false}
                                            multiline={true}
                                            value={reportCommentary}
                                            updateReportCommentary={this.handleChangeReportCommentary}
                                        />
                                    </td>
                                </tr>
                            
                                {/* <p className="roundInfo">{`${yearOfCompetition} Order of Merit - Round ${roundNumber}${isMajor ? ' - MAJOR' : ''}`}</p> */}

                            </tbody>

                        </table>

                    </div>

                    {/* Add a ref so that the size of the box can be determined and the height in vh units set accordingly */}
                    <div className="buttons" ref={el => this.statsBottom = el}>
                        {!isDelete && <Button variant="contained" color="primary" id="save" onClick={this.handleSave}>Save Changes</Button>}
                        {isDelete && <Button variant="contained" color="primary" id="delete" onClick={this.handleDelete}>Delete Round</Button>}
                        {TESTING_MODE && isCreate && <Button variant="contained" color="secondary" id="populate" onClick={this.handlePopulate}>Populate Round</Button>}
                        {TESTING_MODE && isCreate && <Button variant="contained" color="secondary" id="populate" onClick={this.handlePopulateRounds}>Populate Rounds</Button>}
                        <ConfirmationDialog message="Changes saved" open={this.state.dialogSaveIsOpen} onClose={this.handleDialogCloseSave} />
                        <ConfirmYesNo message="Are you sure you want to delete this round ?" dialogYesNoSelectedIsYes={this.state.dialogDelete} open={this.state.dialogDeleteYesNoIsOpen} onClose={this.handleDialogYesNoCloseDelete} />
                        <ConfirmationDialog message="Round has been deleted" open={this.state.dialogDeleteConfirmIsOpen} onClose={this.handleDialogConfirmCloseDelete} />
                    </div>

                </div>

            </div>

        )
    }

}

const mapStateToProps = (state, ownProps) => ({appData: Object.assign({}, state.appData)})

export default connect(mapStateToProps, null)(AdminRoundCRUD);