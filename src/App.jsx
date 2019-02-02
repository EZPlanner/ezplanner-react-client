import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Login from './containers/login';
import Dashboard from './containers/dashboard';
import firebase from './services/firebase';
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

const mapStateToProps = state => ({
  state
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
