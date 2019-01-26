import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./theme";
import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AppBar from "./appbar";
import CourseTable from './coursetable';
import Button from "@material-ui/core/Button";
import { awsPlannerLamdaActionCreator } from "../actionCreators";
import Search from './search';
import CourseChips from './CourseChips';
import {Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-133316416-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;
    }
    componentWillMount(){
        console.log(1)
        if(this.props.userEmail==null){
                console.log(2)
                return <Redirect to="/" push />
              
        }
    }
    
    generatePlannerCourses=()=>{
        this.props.planner(['lorem ipsum'],['lorem ipsum2'],['lorem ipsum3']);
        this.forceUpdate();
    }

    render() {
        return (
            <div className={this.classes.root}>
                <CssBaseline />
                <AppBar />

                <main className={this.classes.content}>
                    <div className={this.classes.appBarSpacer} />
                    <Typography variant="h4" gutterBottom component="h2">
                        <div>
                        {`Welcome back ${this.props.userEmail}!`}
                        </div>
                        <div className={this.classes.root}>
                            <Grid container spacing={24}>
                                <Grid item xs={12} lg={3}/>
                                <Grid item xs={12} lg={3}>
                                    <Paper className={this.classes.searchPaper}>
                                    <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={this.generatePlannerCourses}
                                    >
                                        Generate Dummy Data
                                    </Button>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} lg={3}>
                                <Paper className={this.classes.searchPaper}>
                                    <Search/>
                                </Paper>
                                </Grid>
                                <Grid item xs={12} lg={3}/>
                                
                                <Grid item xs={12} lg={3}/>
                                <Grid item xs={12} lg={6}>
                                    <CourseChips/>
                                </Grid>
                                <Grid item xs={12} lg={3}/>
                                
                            </Grid>
                        </div>
                    </Typography>
                    <Typography
                        component="div"
                        className={this.classes.chartContainer}
                    >
                    </Typography>
                    <Typography variant="h4" gutterBottom component="h2">
                        Courses
                    </Typography>
                    <div className={this.classes.tableContainer}>
                        <CourseTable/>
                    </div>
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    state,
    userEmail: (state.userInfo && state.userInfo.email) || null,
    message: state.message || null
});
const mapDispatchToProps = dispatch =>({
    planner: (courses) => {
        dispatch(awsPlannerLamdaActionCreator(courses));
    },
});

export default withStyles(styles)(
    withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Dashboard))
);
