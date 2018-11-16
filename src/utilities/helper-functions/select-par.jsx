import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class SelectPar extends Component {

    handleChange = event => {
        this.props.updatePar(event.target.value);
    };

    render() {

        const {par} = this.props;

        const allPars = ['All Pars', 3, 4, 5];

        return (
            <FormControl>
                <Select
                    value={par}
                    onChange={this.handleChange}
                    name="par"
                    className="selectPar"
                >
                    {allPars.map((par, i) => <MenuItem key={i} value={par}>{par}</MenuItem>)}
                </Select>
            </FormControl>
        )
    }
}


SelectPar.propTypes = {
    par: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}


export default SelectPar;