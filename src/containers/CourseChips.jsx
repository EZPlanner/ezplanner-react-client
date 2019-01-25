import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import { connect } from "react-redux";
import { updateCoursesActionCreator} from "../actionCreators";

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class CourseChips extends React.Component {
    constructor(props){
        super(props);
        this.classes = props.classes;
    }
    componentWillReceiveProps(nextProps){
        if (this.props.post.category !== nextProps.post.category){
          this.setState({
            title: nextProps.post.title,
            body: nextProps.post.body,
            category: nextProps.post.category,
          })
        }      
      }

  
  handleDelete = data => () => {
      const courses = [...this.props.chipData];
      const chipToDelete = courses.indexOf(data);
      courses.splice(chipToDelete, 1);
      this.props.updateCourses(courses,null)

  };
  renderChips=()=>{
    return(
        this.props.chipData.map(data => {
            let icon = null;
              console.log("Chips"+data)
            if (data.label === 'React') {
              icon = <TagFacesIcon />;
            }
  
            return (
              <Chip
                key={data.key}
                icon={icon}
                label={data.label}
                onDelete={this.handleDelete(data)}
                className={this.classes.chip}
              />
            );
          })
    );
  };

  render() {
    
    return (
      <Paper className={this.classes.root}>
        {this.renderChips}
      </Paper>
    );
  }
}

CourseChips.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    chipData:state.coursesInput||null,
  });
  
const mapDispatchToProps = dispatch =>({
    updateCourses: (courses, course) => {
        dispatch(updateCoursesActionCreator(courses, course));
    },
});

export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CourseChips)
  );
