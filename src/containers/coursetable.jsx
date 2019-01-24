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
componentDidMount() {
  this.props.planner([1,2,3,4]);
}
renderCourses(){
  if(this.props.plannerCourses){
    return(<div>{this.props.plannerCourses}</div>)
  }
  else{
    return(<div>Component </div>);
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
