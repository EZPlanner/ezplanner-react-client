/* eslint-disable no-console */

import React, { Component } from "react";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import { awsPlannerLamdaActionCreator } from "../actionCreators";

import { connect } from "react-redux";
import MuiVirtualizedTable from './MuiVirtualizedTable';
import styles from './theme';
const WrappedVirtualizedTable = withStyles(styles)(MuiVirtualizedTable);



MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cellContentRenderer: PropTypes.func,
      dataKey: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.string,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  sort: PropTypes.func,
};

MuiVirtualizedTable.defaultProps = {
  headerHeight: 56,
  rowHeight: 56,
};

function createData(id,dessert, calories, fat, carbs, protein) {
  id += 1;
  return { id, dessert, calories, fat, carbs, protein };
}

class ReactVirtualizedTable extends Component{
  componentDidMount(){

    for (let i = 0; i < 200; i += 1) {
      var randomSelection = [i];
      randomSelection.push(...(this.data[Math.floor(Math.random() * this.data.length)]));
      this.rows.push(createData(...randomSelection));
    }
  }
  constructor(props){
    super(props);
    // Dummy data
    this.data = [
      ['Frozen yoghurt', 159, 6.0, 24, 4.0],
      ['Ice cream sandwich', 237, 9.0, 37, 4.3],
      ['Eclair', 262, 16.0, 24, 6.0],
      ['Cupcake', 305, 3.7, 67, 4.3],
      ['Gingerbread', 356, 16.0, 49, 3.9],
    ];

    this.rows = [];
  }
  render(){
    return (
      <Paper style={{ height: 400, width: '100%' }}>
        <WrappedVirtualizedTable
          rowCount={this.rows.length}
          rowGetter={({ index }) => this.rows[index]}
          onRowClick={event => console.log(event)}
          columns={[
            {
              width: 200,
              flexGrow: 1.0,
              label: 'Dessert',
              dataKey: 'dessert',
            },
            {
              width: 120,
              label: 'Calories (g)',
              dataKey: 'calories',
              numeric: true,
            },
            {
              width: 120,
              label: 'Fat (g)',
              dataKey: 'fat',
              numeric: true,
            },
            {
              width: 120,
              label: 'Carbs (g)',
              dataKey: 'carbs',
              numeric: true,
            },
            {
              width: 120,
              label: 'Protein (g)',
              dataKey: 'protein',
              numeric: true,
            },
          ]}
        />
      </Paper>
    );
  }
  }
  



const mapDispatchToProps = dispatch => ({
planner: (courses) => {
    dispatch(awsPlannerLamdaActionCreator(courses));
}
});

export default withStyles(styles)(
  connect(
      null,
      mapDispatchToProps
  )(ReactVirtualizedTable)
);


