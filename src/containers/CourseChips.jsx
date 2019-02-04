import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { removeCourseActionCreator } from '../actionCreators';
import { chipStyles } from './theme';

class CourseChips extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.chipPaper}>
        {this.props.chipData.map((course, key) => {
          let icon = null;

          // if (data.label === 'React') {
          //   icon = <TagFacesIcon />;
          // }

          return (
            <Chip
              key={key}
              icon={icon}
              label={course}
              onDelete={() => this.props.removeCourse(course)}
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
  classes: PropTypes.object.isRequired,
  chipData: PropTypes.array,
  removeCourse: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  chipData: state.coursesInput || null
});

const mapDispatchToProps = dispatch => ({
  removeCourse: course => {
    dispatch(removeCourseActionCreator(course));
  }
});

export default withStyles(chipStyles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CourseChips)
);
