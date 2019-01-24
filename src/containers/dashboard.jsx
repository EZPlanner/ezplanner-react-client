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

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;
    }

    render() {
        return (
            <div className={this.classes.root}>
                <CssBaseline />
                <AppBar />

                <main className={this.classes.content}>
                    <div className={this.classes.appBarSpacer} />
                    <Typography variant="h4" gutterBottom component="h2">
                        {`HELLO ${this.props.userEmail}!!!!`}

                        <div className={this.classes.root}>
                            <Grid container spacing={24}>
                                <Grid item xs={12} lg={6}>
                                    <Paper className={this.classes.paper}>
                                        Muje chai hai
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>
                    </Typography>
                    <Typography
                        component="div"
                        className={this.classes.chartContainer}
                    >
                        {/* <SimpleLineChart /> */}
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

export default withStyles(styles)(
    connect(
        mapStateToProps,
        null
    )(Dashboard)
);
