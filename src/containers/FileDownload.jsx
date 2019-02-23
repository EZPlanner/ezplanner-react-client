import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { searchStyle } from './theme';
import { connect } from 'react-redux';
import Download from '@material-ui/icons/CloudDownload';
import { CSVLink } from 'react-csv';
import { prettifyCourseName } from '../utils/courseName';
class FileDownload extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {
      csvData: []
    };
  }

  exportCsv = () => {
    var csvData = [];

    const { plannerCourses, inputCourses } = this.props;

    if (plannerCourses) {
      csvData.push([
        'The courses you can take ',
        'Course Name',
        'Title',
        'Link'
      ]);

      plannerCourses.forEach(course => {
        csvData.push(['', `${course[0]}`, course[1], course[2]]);
      });
      csvData.push(['The courses you have taken', 'Course Name']);

      inputCourses.forEach(course => {
        csvData.push(['', prettifyCourseName(course)]);
      });

      this.setState({
        csvData
      });
    }
  };

  render() {
    return (
      <IconButton
        color="primary"
        className={this.classes.iconButton}
        aria-label="Enter"
        onClick={() => this.exportCsv()}
        component="label"
      >
        <CSVLink
          data={this.state.csvData}
          separator={','}
          filename={'ezplanner.csv'}
          className="btn btn-primary"
          target="_blank"
        >
          <Download />
        </CSVLink>
      </IconButton>
    );
  }
}

FileDownload.propTypes = {
  plannerCourses: PropTypes.array,
  inputCourses: PropTypes.array,
  classes: PropTypes.object
};

const mapStateToProps = state => ({
  plannerCourses: state.plannerCourses,
  inputCourses: state.inputCourses
});

export default withStyles(searchStyle)(
  connect(
    mapStateToProps,
    null
  )(FileDownload)
);
