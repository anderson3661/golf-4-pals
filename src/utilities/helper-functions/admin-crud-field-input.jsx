import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    // fontSize: 16,
    fontSize: 14,
    // padding: '10px 12px',
    padding: '0px 0px',
    textAlign: 'center',
    // width: 'calc(100% - 24px)',
    width: '100%',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
});

class FieldInput extends Component {

    constructor(props) {
        super(props);

        this.handleChangeReportHeading = this.handleChangeReportHeading.bind(this);
        this.handleChangeReportCommentary = this.handleChangeReportCommentary.bind(this);
        this.handleChangeCourseName = this.handleChangeCourseName.bind(this);
        this.handleChangeCourseVariation = this.handleChangeCourseVariation.bind(this);
    }

    classes = this.props.classes;

    handleChangeReportHeading = event => { this.props.updateReportHeading(event.target.value); };
    handleChangeReportCommentary = event => { this.props.updateReportCommentary(event.target.value); };
    handleChangeCourseName = event => { this.props.updateCourseName(event.target.value); };
    handleChangeCourseVariation = event => { this.props.updateCourseVariation(event.target.value); };

    handleChangeArray = event => {
        this.props.updateArray(event.target.value);
    };

    render() {

        return (
            <TextField
                className={`${this.props.name}-input-field`}
                value={this.props.value}
                label=""
                multiline={this.props.multiline}
                rows="5"
                id={this.props.name}
                onChange={this.props.name === "reportHeading" ? this.handleChangeReportHeading :
                          this.props.name === "reportCommentary" ? this.handleChangeReportCommentary :
                          this.props.name === "courseName" ? this.handleChangeCourseName :
                          this.props.name === "courseVariation" ? this.handleChangeCourseVariation :
                          this.handleChangeArray}
                InputProps={{
                    disableUnderline: true,
                    classes: {
                        root: this.classes.bootstrapRoot,
                        input: this.classes.bootstrapInput
                    },
                }}
            />
        );
    }
}


FieldInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

// InputLabelProps={{
//     shrink: true,
//     className: this.classes.bootstrapFormLabel,
// }}

export default withStyles(styles)(FieldInput);