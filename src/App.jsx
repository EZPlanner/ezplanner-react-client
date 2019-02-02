import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import Login from './containers/login';
import Dashboard from './containers/dashboard';
import firebase from './services/firebase';
// import Spinner from './containers/spinner';
import { connect } from 'react-redux';
import { loginSuccessfulActionCreator } from './actionCreators';
import styles from './containers/theme';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

class App extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.login(user);
      }
    });
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <main>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/" component={Login} />
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  login: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(loginSuccessfulActionCreator(user))
});

export default withStyles(styles)(
  withRouter(
    connect(
      null,
      mapDispatchToProps
    )(App)
  )
);
