import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { awsPlannerLamdaActionCreator } from "../actionCreators";
import { connect } from "react-redux";
import styles from './theme';

class CourseTable extends Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {
      courses: ['1', '2', '3', '4'],
  };
  
}
renderCourses(){
  this.props.planner(this.props);
  if(this.props.planner){
    return(<div>{this.props.planner}</div>)
  }
  else{
    return(<div>Deufhwefheh</div>);
  }
}
  render() {
    return (
      <div>
        {this.renderCourses()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
    state,
    message: state.message || null,
    plannerCourses: state.plannerCourses || null
});

const mapDispatchToProps = dispatch => ({
  planner: (courses) => {
      dispatch(awsPlannerLamdaActionCreator(courses));
  }
});

export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CourseTable)
);
