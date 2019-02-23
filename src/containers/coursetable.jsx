/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import MuiVirtualizedTable from './MuiVirtualizedTable';
import InputBase from '@material-ui/core/InputBase';
import { tableStyle } from './theme';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FileDownload from './FileDownload';

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cellContentRenderer: PropTypes.func,
      dataKey: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.string,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  sort: PropTypes.func
};

MuiVirtualizedTable.defaultProps = {
  headerHeight: 56,
  rowHeight: 56
};

function searchingFor(keyword) {
  return function(x) {
    return (
      x.courseCode.toLowerCase().includes(keyword.toLowerCase()) || !keyword
    );
  };
}

class CourseTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: ''
    };
    this.classes = props.classes;
    this.rows = [];
    this.filterHandler = this.filterHandler.bind(this);
  }

  updateTable() {
    const { data } = this.props;
    if (data != null) {
      this.rows = [];
      data.forEach((item, index) => {
        this.rows.push({
          id: index,
          courseCode: item[0],
          courseTittle: item[1],
          link: item[2]
        });
        if (this.state.keyword !== '') {
          this.rows = this.rows.filter(searchingFor(this.state.keyword));
        }
      });
    }
  }

  filterHandler(event) {
    this.setState({ keyword: event.target.value });
  }

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} lg={6}>
            <Typography variant="h4" gutterBottom component="h2">
              Possible Courses You May Take:
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Paper className={this.classes.root} elevation={1}>
              <InputBase
                className={this.classes.filterInput}
                value={this.state.keyword}
                placeholder="Filter Result"
                onChange={this.filterHandler}
              />
              <Divider className={this.classes.searchDivider} />
              <FileDownload />
            </Paper>
          </Grid>
        </Grid>

        <Divider className={this.classes.filterDivider} />
        <Paper style={{ height: '76vh', width: '100%' }}>
          {this.updateTable()}
          <MuiVirtualizedTable
            rowCount={this.rows.length}
            rowGetter={({ index }) => this.rows[index]}
            columns={[
              {
                width: 200,
                label: 'Course Code',
                dataKey: 'courseCode'
              },
              {
                width: 200,
                flexGrow: 0.5,
                label: 'Course Tittle',
                dataKey: 'courseTittle'
              },

              {
                flexGrow: 0.5,
                width: 200,
                label: 'Link',
                dataKey: 'link'
              }
            ]}
          />
        </Paper>
      </div>
    );
  }
}

CourseTable.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.array
};

export default withStyles(tableStyle)(
  connect(
    null,
    null
  )(CourseTable)
);
