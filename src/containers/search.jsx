import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Enter from '@material-ui/icons/KeyboardArrowRight';
import {searchStyle} from './theme';
import { connect } from "react-redux";
import { updateCoursesActionCreator} from "../actionCreators";
import { Paper } from '@material-ui/core';
// https://material-ui.com/demos/autocomplete/ 



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
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit()
    }
  }


  handleSubmit=()=>{
    if(this.state.course!=null && this.state.course!==""){
      this.props.updateCourses(this.props.courses,this.state.course)
    }
    this.setState({
      course:null
    })
  }

  render(){
    console.log(this.props.courses)
    return (
      <div className={this.classes.root}>
        <InputBase 
          className={this.classes.input} 
          value={this.state.course||""}
          placeholder="Ex. ECE224" 
          onChange={this.handleChange} 
          id ="course"
          onKeyPress={this.handleKeyPress} />
        <Divider className={this.classes.divider} />
        <IconButton color="primary" className={this.classes.iconButton} aria-label="Enter" onClick={this.handleSubmit}>
          <Enter />
        </IconButton>
        </div>
      
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