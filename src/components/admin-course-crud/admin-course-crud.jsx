import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Prompt } from 'react-router';

import { createCourse, updateCourse, deleteCourse } from '../../redux/actions';

import {TESTING_MODE, HOLES, MAX_LENGTHS, STATS_MIN_VIEWPOINT_HEIGHT} from '../../utilities/constants';
import * as helpers from '../../utilities/helper-functions/helpers';
import DisplayTotals from '../../utilities/helper-functions/admin-crud-display-totals';
import Button from "@material-ui/core/Button";

import AdminFieldInput from '../../utilities/helper-functions/admin-field-input';
import SelectCourse from '../../utilities/helper-functions/select-course';
import ConfirmationDialog from '../dialogs/confirmationDialog';
import ConfirmYesNo from '../dialogs/confirmYesNo';

import '../stats-scorecard/scorecard.scss';
import './admin-course-crud.scss';

const EMPTY_STATE = {
    dialogSaveIsOpen: false,
    dialogDeleteYesNoIsOpen: false,
    dialogDeleteYesSelected: false,
    dialogDeleteConfirmIsOpen: false,
    courseName: "",
    courseNameInput: "",
    courseVariation: "",
    holeNames: new Array(18).fill(""),
    pars: new Array(18).fill(""),
    yardages: new Array(18).fill(""),
    strokeIndexes: new Array(18).fill("")
}


class AdminCourseCRUD extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ...EMPTY_STATE,
            isCreate: props.isCreate,
            isUpdate: props.isUpdate,
            isDelete: props.isDelete,
            height: STATS_MIN_VIEWPOINT_HEIGHT
        };
    }

    haveChangesBeenMade = () => {

        let {courseName, courseVariation, holeNames, pars, yardages, strokeIndexes, isUpdate} = this.state;

        if (isUpdate) {
            if (courseName !== "") {
                let previousCourse = helpers.getCourse(this.props.appData.courses, courseName, courseVariation);
                return previousCourse.courseName !== courseName ||
                    previousCourse.courseVariation !== courseVariation ||
                    helpers.areArrayContentsDifferent(holeNames, previousCourse, "holeName") ||
                    helpers.areArrayContentsDifferent(pars, previousCourse, "par") ||
                    helpers.areArrayContentsDifferent(yardages, previousCourse, "yardage") ||
                    helpers.areArrayContentsDifferent(strokeIndexes, previousCourse, "strokeIndex");
            } else {
                return false;
            }
        } else {
            return (
                courseName.trim() !== "" ||
                courseVariation.trim() !== "" ||
                holeNames.join("") !== "" ||
                pars.join("") !== "" ||
                yardages.join("") !== "" ||
                strokeIndexes.join("") !== ""
            );
        }
        
    }

    handleChangeCourseName = courseName => {
        this.setState({ courseName: courseName });
        (this.props.isUpdate || this.props.isDelete) && this.updateAfterCourseSelection(courseName, "");
    };

    handleChangeCourseVariation = (courseName, courseVariation) => {
        debugger;
        console.log(this);
        this.props.isCreate && this.setState({ courseVariation: courseVariation });
        (this.props.isUpdate || this.props.isDelete) && this.updateAfterCourseSelection(courseName, courseVariation);
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

    handleChangeArray = (element, holeNumber, newValue) => {
        this.setState(prevState => ({[element]: this.getNewArray(prevState, element, holeNumber, newValue)}));
    };

    getNewArray = (prevState, element, holeNumber, newValue) => {
        if (element !== "holeNames") newValue = newValue.trim();
        if (element !== "holeNames" && isNaN(newValue.slice(newValue.length-1, 1))) newValue = newValue.slice(0, newValue.length-1);   // If the last character is not a number then remove it
        if (newValue.length > MAX_LENGTHS[element]) newValue = newValue.slice(0, MAX_LENGTHS[element]);          // If the number of characters is greater than allowed (i.e. pars = 1 character) then remove
        if (element !== "holeNames" & newValue !== "") newValue = parseInt(newValue, 10);                        // If the value is not an empty string then convert to a number

        return helpers.updateElementInArray(prevState[element], holeNumber - 1, newValue);                       // Take one off holeNumber as the array is zero based
    };

    handleSave = (e) => {
        // e.preventDefault();

        if (this.validateAdminCourseCRUD()) return;
        
        let {courseName, courseVariation, holeNames, pars, yardages, strokeIndexes} = this.state;
        let {isCreate, isUpdate} = this.props;
       
        let data = {
            courseName: courseName.trim(),
            courseVariation: courseVariation.trim(),
            holes: holeNames.map((holeName, holeNumber) => ({holeNumber: holeNumber+1, holeName: holeName.trim(), yardage: yardages[holeNumber], par: pars[holeNumber], strokeIndex: strokeIndexes[holeNumber]}))
        }

        if (isCreate) {
            this.props.dispatch(createCourse(data));
        } else if (isUpdate) {
            let courseArrayNumber = helpers.getCourseArrayNumber(this.props.appData.courses, courseName, courseVariation);
            if (courseArrayNumber > 0) {
                if (isUpdate) {
                    this.props.dispatch(updateCourse({course: {...data}, courseArrayNumber: courseArrayNumber}));
                }
            }
        }

        // Clear the form, but specify dialogSaveIsOpen = true, so that the 'Changes Saved' dialog appears
        if (isUpdate) {
            this.setState({dialogSaveIsOpen: true});
        } else {
            this.setState({...EMPTY_STATE, dialogSaveIsOpen: true, isCreate: this.props.isCreate, isUpdate: this.props.isUpdate, isDelete: this.props.isDelete});
        }
    };

    handleDialogCloseSave = () => {
        this.setState({ dialogSaveIsOpen: false })
    }

    handleDelete = () => {
        if (this.validateAdminCourseCRUD()) return;
        this.setState({dialogDeleteYesNoIsOpen: true});
    }

    handleDialogYesNoCloseDelete = (value) => {
        this.setState({ dialogDeleteYesSelected: value, dialogDeleteYesNoIsOpen: false }, () => {
            if (this.state.dialogDeleteYesSelected) {
                let courseArrayNumber = helpers.getCourseArrayNumber(this.props.appData.courses, this.state.courseName, this.state.courseVariation);
                if (courseArrayNumber > 0) {
                    this.props.dispatch(deleteCourse({courseArrayNumber: courseArrayNumber}));

                    // Clear the form, but specify dialogDeleteCourseConfirmIsOpen = true, so that the 'Course has been deleted' dialog appears
                    this.setState({...EMPTY_STATE, dialogDeleteConfirmIsOpen: true, isCreate: this.props.isCreate, isUpdate: this.props.isUpdate, isDelete: this.props.isDelete});
                }
            }
        });
    }

    handleDialogConfirmCloseDelete = () => {
        this.setState({ dialogDeleteConfirmIsOpen: false })
    }

    validateAdminCourseCRUD = () => {
        let validationWarnings = "";
    
        let {courseName, courseVariation, holeNames, pars, yardages, strokeIndexes, isCreate, isUpdate, isDelete} = this.state;
        let {courses, allRounds} = this.props.appData;
    
        // Trim data
        courseName = courseName.trim();
        courseVariation = courseVariation.trim();
        holeNames.map(holeName => holeName.trim());
        
        // Validate data
        if (!courseName) validationWarnings += `- Course Name must be ${isCreate ? 'entered' : 'selected'}`;
        if (isCreate && courseName && helpers.doesCourseAlreadyExist(courses, courseName, courseVariation)) validationWarnings += '\n- Course Name/Variation already exists';
        if ((isUpdate || isDelete) && helpers.hasARoundBeenPlayedAtThisCourse(courses, allRounds, courseName, courseVariation, pars)) validationWarnings += '\n- One or more rounds has been played at this course (delete the round(s) first)';
        
        if (isCreate || isUpdate) {
    
            if (holeNames.join("") !== "") {
                let allHoleNamesHaveValues = true;
                holeNames.forEach(holeName => { if (holeName === "") allHoleNamesHaveValues = false});
                if (!allHoleNamesHaveValues) validationWarnings += '\n- Hole Names must either all have a value or all be blank';
            }
    
            if (!helpers.areAllArrayValuesEntered(pars)) {
                validationWarnings += '\n- All Pars must be entered';
            } else {
                pars.map((par, holeNumber) => validationWarnings += (par < 3 || par > 5 ? `\n- Hole ${holeNumber + 1} : Par must be 3,4 or 5` : ""));
            }
    
            if (!helpers.areAllArrayValuesEntered(yardages)) {
                validationWarnings += '\n- All Yellow Yards must be entered';
            } else {
                yardages.map((yardage, holeNumber) => validationWarnings += (yardage < 50 || yardage >= 700 ? `\n- Hole ${holeNumber + 1} : Yardage must be between 50 and 699` : ""));
            }
    
            if (!helpers.areAllArrayValuesEntered(strokeIndexes)) {
                validationWarnings += '\n- All Stroke Indexes must be entered';
            } else {
                let areStrokeIndexesOK = true;
                strokeIndexes.forEach((strokeIndex, holeNumber) => {
                    if (strokeIndex < 1 || strokeIndex > 18) {
                        validationWarnings += `\n- Hole ${holeNumber + 1} : Stroke Index must be between 1 and 18`;
                        areStrokeIndexesOK = false;
                    }
                });
                
                if (areStrokeIndexesOK) {
                    debugger;
                    let areStrokeIndexesCorrect = true;
                    let strokeIndexesSorted = [...strokeIndexes].sort((a,b) => a-b);
                    HOLES.forEach(hole => {
                        if (hole !== strokeIndexesSorted[hole - 1]) {
                            areStrokeIndexesCorrect = false;
                        };
                    });
                    if (!areStrokeIndexesCorrect) validationWarnings += '\n- Stroke Indexes must be unique values between 1 to 18';
                }
            }
        }
    
        if (validationWarnings) {
            alert('Cannot continue ... please correct the following and retry ...\n\n' + validationWarnings);
        }
    
        return validationWarnings;
    }

    // Only applicable for type = isCreate, and only for testing purposes
    handlePopulate = () => {
        if (!this.state.courseName) this.setState({courseName: "Temp Course"});
        if (!this.state.courseVariation) this.setState({courseVariation: "Temp Variation"});

        this.setState({holeNames: this.state.holeNames.map((holeName, holeNumber) => {
            return (!holeName ? "Hole Name " + (holeNumber + 1) : holeName);
        })});

        // Create a temporary pars array so that it can be used in the pars setState as well as the yardages setState
        let pars = this.state.pars.map(par => Math.round((Math.random() * 2) + 3, 0));

        this.setState({pars: this.state.pars.map((par, holeNumber) => {
            return (!par ? pars[holeNumber] : par);
        })});

        this.setState({yardages: this.state.yardages.map((yardage, holeNumber) => {
            return (!yardage ? Math.round((Math.random() * 100) + (pars[holeNumber] === 3 ? 1 : pars[holeNumber]) * 100, 0) : yardage);
        })});

        // Get stroke indexes, i.e. 1-18 but in random order using the helper method
        let shuffledStrokeIndexes = [...HOLES];
        helpers.shuffleArray(shuffledStrokeIndexes);
        this.setState({strokeIndexes: this.state.strokeIndexes.map((strokeIndex, holeNumber) => {
            return (!strokeIndex ? shuffledStrokeIndexes[holeNumber] : strokeIndex);
        })});
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('componentDidUpdate');
        helpers.changeViewPortHeightOfStatsElementOnUpdate(this, prevState);
    }

    // componentWillReceiveProps() {
    //     console.log('componentWillReceiveProps ... to be deprecated');        
    // }

    static getDerivedStateFromProps(nextProps, prevState) {
        // If the user changes the navigation from New Course to Edit Course, or visa-versa then need to blank out the form
        // console.log('getDerivedStateFromProps');
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

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // console.log('shouldComponentUpdate');
        return true;        
    }

    componentDidMount() {
        // console.log('componentDidMount');
        helpers.goToTopOfPage();
        helpers.changeViewPortHeightOfStatsElementOnMount(this);
    }

    // componentWillMount() {
    //     console.log('componentWillMount ... to be deprecated');        
    // }

    // componentWillUnmount() {
        // console.log('componentWillUnmount');        
    // }

    render() {
        let holeNumber;
        let course;

        let {isCreate, isUpdate, isDelete} = this.props;
        let {courses} = this.props.appData;
        let {courseName, courseVariation} = this.state;

        if ((isUpdate || isDelete) && courseName !== "") course = helpers.getCourse(courses, courseName, courseVariation);

        return (

            <div className="stats-outer" style={{height: this.state.height + "vh"}}>       {/* Remember to set the style element */}
                
                <div className="stats scorecard admin-course-crud">

                    <div className="admin-course-crud-inner">

                        <Prompt when={this.haveChangesBeenMade()} message={`Are you sure you want to abandon ${isDelete ? 'this undeleted course' : 'these unsaved changes'} ?`} />

                        {isCreate &&
                            <header className="header narrow">

                                <span className="title">Course Name:
                                    <AdminFieldInput
                                        name="courseName"
                                        value={courseName}
                                        onChangeInputFieldValue={this.handleChangeCourseName}
                                    />
                                </span>

                                <span className="title">Course Variation:
                                    <AdminFieldInput
                                        name="courseVariation"
                                        value={courseVariation}
                                        onChangeInputFieldValue={this.handleChangeCourseVariation.bind(this, courseName)}
                                    />
                                </span>

                            </header>
                        }

                        {(isUpdate || isDelete) &&
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
                            </header>
                        }

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
                                </tr>
                            </thead>

                            <tbody>

                                {HOLES.map((hole, i) => {

                                    holeNumber = i + 1;

                                    return (
                                        <Fragment key={i}>

                                            {holeNumber === 10 && <DisplayTotals className="subTotalsRow" rowTitle="OUT" holesType="frontNine" state={this.state} />}

                                            <tr className="hole">                            
                                                <td>{holeNumber}</td>

                                                {isDelete ?
                                                    <Fragment>
                                                        <td>{courseName !== "" && course.holes[holeNumber-1].holeName}</td>
                                                        <td>{courseName !== "" && course.holes[holeNumber-1].par}</td>
                                                        <td>{courseName !== "" && course.holes[holeNumber-1].yardage}</td>
                                                        <td className="strokeIndex">{courseName !== "" && course.holes[holeNumber-1].strokeIndex}</td>
                                                    </Fragment>
                                                :
                                                    <Fragment>

                                                        <td className="holeName">
                                                            <AdminFieldInput
                                                                name="holeName"
                                                                value={this.state.holeNames[holeNumber-1]}
                                                                onChangeInputFieldValue={this.handleChangeArray.bind(this, "holeNames", holeNumber)}
                                                            />
                                                        </td>

                                                        <td className="par">
                                                            <AdminFieldInput
                                                                name="par"
                                                                value={this.state.pars[holeNumber-1]}
                                                                onChangeInputFieldValue={this.handleChangeArray.bind(this, "pars", holeNumber)}
                                                            />
                                                        </td>

                                                        <td className="yardage">
                                                            <AdminFieldInput
                                                                name="yardage"
                                                                value={this.state.yardages[holeNumber-1]}
                                                                onChangeInputFieldValue={this.handleChangeArray.bind(this, "yardages", holeNumber)}
                                                            />
                                                        </td>

                                                        <td className="strokeIndex">
                                                            <AdminFieldInput
                                                                name="strokeIndex"
                                                                value={this.state.strokeIndexes[holeNumber-1]}
                                                                onChangeInputFieldValue={this.handleChangeArray.bind(this, "strokeIndexes", holeNumber)}
                                                            />
                                                        </td>

                                                    </Fragment>
                                                }

                                            </tr>

                                        </Fragment>
                                    )
                                })}

                                <DisplayTotals className="subTotalsRow" rowTitle="OUT" holesType="backNine" state={this.state} />

                                <DisplayTotals className="totalsRow" rowTitle="TOTAL" holesType="allHoles" state={this.state} />

                            </tbody>

                        </table>

                    </div>

                    {/* Add a ref so that the size of the box can be determined and the height in vh units set accordingly */}
                    <div className="buttons" ref={el => this.statsBottom = el}>
                        {!isDelete && <Button variant="contained" color="primary" id="save" onClick={this.handleSave}>Save Changes</Button>}
                        {isDelete && <Button variant="contained" color="primary" id="delete" onClick={this.handleDelete}>Delete Course</Button>}
                        {TESTING_MODE && isCreate && <Button variant="contained" color="secondary" id="populate" onClick={this.handlePopulate}>Populate Course</Button>}
                        <ConfirmationDialog message="Changes saved" open={this.state.dialogSaveIsOpen} onClose={this.handleDialogCloseSave} />
                        <ConfirmYesNo message="Are you sure you want to delete this course ?" dialogYesNoSelectedIsYes={this.state.dialogDeleteCourse} open={this.state.dialogDeleteYesNoIsOpen} onClose={this.handleDialogYesNoCloseDelete} />
                        <ConfirmationDialog message="Course has been deleted" open={this.state.dialogDeleteConfirmIsOpen} onClose={this.handleDialogConfirmCloseDelete} />
                    </div>

                </div>

            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => ({appData: Object.assign({}, state.appData)})

export default connect(mapStateToProps, null)(AdminCourseCRUD);