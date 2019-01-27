/* eslint-disable no-console */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Download from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
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



class CourseTable extends Component{
  constructor(props){  
    super(props);
    this.rows = [];
    
  }
  
  updateTable(){
    if(this.props.data!=null){
      for (let i = 0; i < (this.props.data.length); i += 1) {
        this.rows.push({
          id:i,
          courseCode:this.props.data[i][0],
          courseTittle:this.props.data[i][1],
          link:this.props.data[i][2],
        });
      }
    }
    
  }
  render(){
    return (
      <div>
        {this.updateTable()}
      <Paper style={{ height: 400, width: '100%' }}>
        <WrappedVirtualizedTable
          rowCount={this.rows.length}
          rowGetter={({ index }) => this.rows[index]}
          onRowClick={event => console.log(event)}
          columns={[
            {
              
              width: 200,
              label: 'Course Code',
              dataKey: 'courseCode',
              
            },
            {
              width: 200, 
              flexGrow: 0.5,
              label: 'Course Tittle',
              dataKey: 'courseTittle',
            },
            
            {
              flexGrow: 0.5,
              width: 200,
              label: 'Link',
              dataKey: 'link',
            },
            
          ]}
        />
        
      </Paper>
      {/* <IconButton>
          <Download/>
      </IconButton> */}
      </div>
    );
  }
  }
  


  const mapStateToProps = state => ({
    data:state.plannerCourses||null,
});


export default withStyles(styles)(
  connect(
      mapStateToProps,
      null
  )(CourseTable)
);


