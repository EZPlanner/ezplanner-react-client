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
import Spinner from './containers/spinner';

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
      } else {
        localStorage.removeItem('ezplanner.expectSignIn');
      }
    });
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <main>
            {localStorage.getItem('ezplanner.expectSignIn') &&
            !this.props.userInfo ? (
                <Spinner />
              ) : (
                <div>
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/" component={Login} />
                </div>
              )}
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  login: PropTypes.func,
  userInfo: PropTypes.object
};

const mapStateToProps = state => ({
  userInfo: state.userInfo
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(loginSuccessfulActionCreator(user))
});

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(App)
  )
);
