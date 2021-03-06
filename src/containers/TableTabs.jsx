import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import CourseTable from './coursetable';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
    // width: 500
  }
});

class TableTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            // variant="fullWidth"
            centered
          >
            <Tab label="Courses with Prereqs" />
            <Tab label="Courses without Prereqs" />
            {/* <Tab label="Item Three" /> */}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <CourseTable data={this.props.data_eligible} />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <CourseTable data={this.props.data_free} />
          </TabContainer>
          {/* <TabContainer dir={theme.direction}>Item Three</TabContainer> */}
        </SwipeableViews>
      </div>
    );
  }
}

TableTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  data_eligible: PropTypes.array,
  data_free: PropTypes.array
};
const mapStateToProps = state => ({
  data_eligible: state.plannerCourses || null,
  data_free: state.plannerFreeCourses || null
});
export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    null
  )(TableTabs)
);
