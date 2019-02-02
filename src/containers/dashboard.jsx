import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './theme';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from './appbar';
import CourseTable from './coursetable';
import Button from '@material-ui/core/Button';
import { awsPlannerLamdaActionCreator } from '../actionCreators';
import Search from './search';
import CourseChips from './CourseChips';
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
ReactGA.initialize('UA-133316416-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
  }

  generatePlannerCourses = () => {
    this.props.planner(this.props.courseInput);
    this.forceUpdate();
  };

  render() {
    return (
      <div className={this.classes.root}>
        <CssBaseline />
        <AppBar />

        <main className={this.classes.content}>
          <div className={this.classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            <div>{`Welcome back ${this.props.userEmail}!`}</div>
            <div className={this.classes.root}>
              <Grid container spacing={24}>
                <Grid item xs={12} lg={3}>
                  <Paper className={this.classes.searchPaper}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={this.generatePlannerCourses}
                    >
                      Generate
                    </Button>
                  </Paper>
                </Grid>
                <Grid item xs={12} lg={12} />
                <Grid item xs={12} lg={1} />
                <Grid item xs={12} lg={4}>
                  <Search />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <Grid item xs={12} lg={1} />
                  <CourseChips />
                </Grid>
              </Grid>
            </div>
          </Typography>
          <Typography component="div" className={this.classes.chartContainer} />
          <Typography variant="h4" gutterBottom component="h2">
            Courses
          </Typography>
          <div className={this.classes.tableContainer}>
            <CourseTable />
          </div>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object,
  courseInput: PropTypes.array,
  message: PropTypes.string,
  userEmail: PropTypes.string,
  planner: PropTypes.func
};

const mapStateToProps = state => ({
  state,
  userEmail: (state.userInfo && state.userInfo.email) || null,
  message: state.message || null,
  courseInput: state.coursesInput || null
});

const mapDispatchToProps = dispatch => ({
  planner: courses => {
    dispatch(awsPlannerLamdaActionCreator(courses));
  }
});

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Dashboard)
  )
);
