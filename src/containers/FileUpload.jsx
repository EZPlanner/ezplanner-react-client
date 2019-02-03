import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Enter from '@material-ui/icons/KeyboardArrowRight';
import { searchStyle } from './theme';
import { connect } from 'react-redux';
import { addCourseActionCreator } from '../actionCreators';
import { Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';

// https://material-ui.com/demos/autocomplete/

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {
      fileName: null
    };
  }

  handleUpload = event => {
    if (event.target.files.length > 0) {
      // Accessed .name from file
      this.setState({ fileName: event.target.files[0].name });
    }
  };

  render() {
    return (
      <Paper className={this.classes.root} elevation={1}>
        <InputBase
          className={this.classes.input}
          value={this.state.fileName || ''}
          placeholder="Upload your transcript!"
          id="file"
          disabled
        />

        <IconButton
          color="primary"
          className={this.classes.iconButton}
          aria-label="Enter"
          onClick={this.handleSubmit}
          component="label"
        >
          <Enter />
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={event => this.handleUpload(event)}
            name="selectedFile"
          />
        </IconButton>

        <Divider className={this.classes.searchDivider} />
      </Paper>
    );
  }
}

FileUpload.propTypes = {
  classes: PropTypes.object.isRequired,
  planner: PropTypes.func,
  courses: PropTypes.array,
  addCourse: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  addCourse: course => {
    dispatch(addCourseActionCreator(course));
  }
});

export default withStyles(searchStyle)(
  connect(
    null,
    mapDispatchToProps
  )(FileUpload)
);
