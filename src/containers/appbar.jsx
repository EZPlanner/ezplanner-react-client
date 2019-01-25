import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./theme";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import classNames from "classnames";
import { logoutActionCreator } from "../actionCreators";

class Appbar extends Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;
        this.state = {
            open: false
        };
    }
    handleLogOut = () => {
        console.log("test");
        this.props.logout();
    };
    render() {
        return (
            <div>
                <AppBar
                    position="absolute"
                    className={classNames(
                        this.classes.appBar,
                        this.state.open && this.classes.appBarShift
                    )}
                >
                    <Toolbar
                        disableGutters={!this.state.open}
                        className={this.classes.toolbar}
                    >
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={this.classes.title}
                        >
                            EZPlanner
                        </Typography>
                        <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                            >
                                Logout
                        </Typography>
                        <IconButton color="inherit" onClick={this.handleLogOut}>
                            
                            <Badge badgeContent={0} color="secondary">
                                <ExitToApp />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => {
        dispatch(logoutActionCreator());
    }
});

export default withStyles(styles)(
    connect(
        null,
        mapDispatchToProps
    )(Appbar)
);
