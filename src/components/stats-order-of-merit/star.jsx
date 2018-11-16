import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

const styles = theme => ({
  margin: {
    margin: `0 ${theme.spacing.unit * 2.5}px`,
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 3.5}px 0 ${theme.spacing.unit * 2.5}px`,
  },
});

function Star(props) {
  const { classes } = props;
  {/* <Badge color="secondary" badgeContent={props.position} className={classes.margin}> */}
  return (
      <Badge color="secondary" badgeContent="1" className={classes.margin}>
        {/* <span></span> */}
      </Badge>
  );
}

Star.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Star);