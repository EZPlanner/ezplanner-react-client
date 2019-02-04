import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { appbarStyles } from './theme';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import { logoutActionCreator } from '../actionCreators';
import Disclaimer from './disclaimer';
// TODO(atul): Change the following component's name so that it doesn't conflict with library
class Appbar extends Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {
      open: false
    };
  }

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
            <Disclaimer />
            <Typography component="h1" variant="h6" color="inherit" noWrap>
              Logout
            </Typography>
            <IconButton color="inherit" onClick={this.props.logout}>
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

Appbar.propTypes = {
  classes: PropTypes.object,
  logout: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logoutActionCreator());
  }
});

export default withStyles(appbarStyles)(
  connect(
    null,
    mapDispatchToProps
  )(Appbar)
);
