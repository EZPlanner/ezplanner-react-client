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
// https://material-ui.com/demos/autocomplete/

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {
      course: null
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  };

  handleSubmit = () => {
    if (this.state.course != null && this.state.course !== '') {
      this.props.addCourse(this.state.course);
    }

    this.setState({
      course: null
    });
  };

  render() {
    return (
      <Paper className={this.classes.root} elevation={1}>
        <InputBase
          className={this.classes.input}
          value={this.state.course || ''}
          placeholder="Ex. ECE224"
          onChange={this.handleChange}
          id="course"
          onKeyPress={this.handleKeyPress}
        />

        <IconButton
          color="primary"
          className={this.classes.iconButton}
          aria-label="Enter"
          onClick={this.handleSubmit}
        >
          <Enter />
        </IconButton>
        <Divider className={this.classes.searchDivider} />
      </Paper>
    );
  }
}

Search.propTypes = {
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
  )(Search)
);
