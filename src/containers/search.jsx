import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Enter from '@material-ui/icons/KeyboardArrowRight';
import {searchStyle} from './theme';
import { connect } from "react-redux";
import { updateCoursesActionCreator} from "../actionCreators";




class Search extends React.Component{
  constructor(props){
    super(props);
    this.classes = props.classes;
    this.state=({
      course:null,
    })
  }
  handleChange= event =>{
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit=()=>{
    if(this.state.course!=null && this.state.course!==""){
      this.props.updateCourses(this.props.courses,this.state.course)
      console.log(this.props.courses)
    }
    this.setState({
      course:null
    })
    
  }
  render(){
    return (
      <Paper className={this.classes.root} elevation={1}>
        <InputBase className={this.classes.input} value={this.state.course||""}placeholder="Start typing courses" onChange={this.handleChange} id ="course" />
        <Divider className={this.classes.divider} />
        <IconButton color="primary" className={this.classes.iconButton} aria-label="Enter" onClick={this.handleSubmit}>
          <Enter />
        </IconButton>
      </Paper>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  courses:state.coursesInput||null
});

const mapDispatchToProps = dispatch =>({
  updateCourses: (courses, course) => {
      dispatch(updateCoursesActionCreator(courses, course));
  },
});

export default withStyles(searchStyle)(
  connect(
      mapStateToProps,
      mapDispatchToProps
  )(Search)
);