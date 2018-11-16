import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import * as helpers from '../../utilities/helper-functions/helpers';

class SelectDateOfRound extends Component {

    handleChange = event => {
        this.props.updateDateOfRound(event.target.value);
    };

    render() {

        const {courses, courseName, allRounds, dateOfRound} = this.props;

        const allDatesOfRounds = helpers.getAllDatesOfRounds(allRounds, courses, courseName);

        return (
            <FormControl>
                <Select
                    value={dateOfRound}
                    onChange={this.handleChange}
                    name="dateOfRound"
                    className="selectDateOfRound"
                >
                    {allDatesOfRounds.map((dateOfRound, i) => <MenuItem key={i} value={dateOfRound}>{dateOfRound}</MenuItem>)}
                </Select>
            </FormControl>
        )
    }
}


SelectDateOfRound.propTypes = {
    courses: PropTypes.array.isRequired,
    courseName: PropTypes.string.isRequired,
    allRounds: PropTypes.array.isRequired,
    dateOfRound: PropTypes.string.isRequired
}


export default SelectDateOfRound;