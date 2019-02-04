import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { loginActionCreator, registerActionCreator } from '../actionCreators';
import { connect } from 'react-redux';
import { loginStyles } from './theme';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';

import classNames from 'classnames';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-133316416-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class Login extends Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {
      email: '',
      password: '',
      open: this.props.message != null
    };
  }
  componentDidMount() {
    if (this.props.message) {
      this.setState({
        open: true
      });
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleLogIn = () => {
    this.setState({
      open: true
    });
    const { email, password } = this.state;
    this.props.login(email, password);
  };

  handleRegister = () => {
    this.setState({
      open: true
    });
    const { email, password } = this.state;
    this.props.register(email, password);
  };

  renderSnackBar() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={this.state.open}
        autoHideDuration={3000}
        onClose={this.handleClose}
      >
        <SnackbarContent
          className={classNames(this.classes.error, this.className)}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={this.classes.message}>
              <ErrorIcon
                className={classNames(
                  this.classes.error,
                  this.classes.iconVariant
                )}
              />
              {this.props.message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={this.classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon className={this.classes.icon} />
            </IconButton>
          ]}
        />
      </Snackbar>
    );
  }

  render() {
    return (
      <div className="login">
        <main className={this.classes.main}>
          <CssBaseline />
          <Paper className={this.classes.paper}>
            <Avatar className={this.classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={this.classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={this.handleChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleChange}
                />
              </FormControl>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={this.classes.submit}
                onClick={this.handleLogIn}
              >
                Sign in
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={this.classes.submit}
                onClick={this.handleRegister}
              >
                Register
              </Button>
            </form>
          </Paper>
        </main>
        {this.renderSnackBar()}
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object,
  message: PropTypes.string,
  login: PropTypes.func,
  register: PropTypes.func
};

const mapStateToProps = state => ({
  message: state.message
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) => {
    dispatch(loginActionCreator(email, password));
  },
  register: (email, password) => {
    dispatch(registerActionCreator(email, password));
  }
});

export default withStyles(loginStyles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
