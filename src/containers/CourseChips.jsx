import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import { connect } from 'react-redux';
import { updateCoursesActionCreator } from '../actionCreators';
import chipStyles from './theme';

class CourseChips extends Component {
  handleDelete = data => () => {
    const courses = [...this.props.chipData];
    const chipToDelete = courses.indexOf(data);
    courses.splice(chipToDelete, 1);
    this.props.updateCourses(courses, null);
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.chipPaper}>
        {this.props.chipData.map(data => {
          let icon = null;
          //   console.log("Chips"+data)
          // if (data.label === 'React') {
          //   icon = <TagFacesIcon />;
          // }

          return (
            <Chip
              key={data.key}
              icon={icon}
              label={data.label}
              onDelete={this.handleDelete(data)}
              className={classes.chip}
              color="primary"
            />
          );
        })}
      </Paper>
    );
  }
}

CourseChips.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  chipData: state.coursesInput || null
});

const mapDispatchToProps = dispatch => ({
  updateCourses: (courses, course) => {
    dispatch(updateCoursesActionCreator(courses, course));
  }
});

export default withStyles(chipStyles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CourseChips)
);
