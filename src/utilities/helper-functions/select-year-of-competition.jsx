import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import * as helpers from '../../utilities/helper-functions/helpers';

class SelectYearOfCompetition extends Component {

    handleChange = event => {
        this.props.updateYearOfCompetition(event.target.value);
    };

    render() {

        const {allRounds, yearOfCompetition} = this.props;

        const allYearsOfCompetition = helpers.getAllYearsOfCompetition(allRounds, this.props.includeAllYears);

        return (
            <FormControl>
                <Select
                    value={yearOfCompetition}
                    onChange={this.handleChange}
                    name="yearOfCompetition"
                    className="selectYearOfCompetition"
                >
                    {allYearsOfCompetition.map((yearOfCompetition, i) => <MenuItem key={i} value={yearOfCompetition}>{yearOfCompetition}</MenuItem>)}
                </Select>
            </FormControl>
        )
    }
}


SelectYearOfCompetition.propTypes = {
    allRounds: PropTypes.array.isRequired,
    yearOfCompetition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}


export default SelectYearOfCompetition;