import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import * as helpers from '../../utilities/helper-functions/helpers';

class SelectCourse extends Component {

    handleChange = event => {
        this.props.updateCourse(event.target.value);
    };

    // {/* <FormControl className={classes.formControl}> */}
    // {/* className={classes.selectEmpty} */}
    // {/* <FormHelperText>Select Year</FormHelperText> */}

    render() {

        const {courses, selectCourseName, courseName, fieldValue} = this.props;

        const options = selectCourseName ? helpers.getAllCourses(courses, this.props.includeAllCourses) : helpers.getCourseVariations(courses, courseName);

        return (
            <FormControl>
                <Select
                    value={fieldValue}
                    onChange={this.handleChange}
                    name="course"
                    className="selectCourseName"
                >
                    {options.map((option, i) => <MenuItem key={i} value={option}>{option}</MenuItem>)}
                </Select>
            </FormControl>
        )
    }
}


SelectCourse.propTypes = {
    courses: PropTypes.array.isRequired,
    selectCourseName: PropTypes.bool.isRequired,
    courseName: PropTypes.string.isRequired,
    fieldValue: PropTypes.string.isRequired
}


export default SelectCourse;