import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Enter from '@material-ui/icons/KeyboardArrowRight';
import {searchStyle} from './theme'


function Search(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      <InputBase className={classes.input} placeholder="Start typing courses" />
      <Divider className={classes.divider} />
      <IconButton color="primary" className={classes.iconButton} aria-label="Directions">
        <Enter />
      </IconButton>
    </Paper>
  );
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(searchStyle)(Search);