import actions from '../actions';
import firebase from '../services/firebase';

/*
    Logging in
*/
export const loginActionCreator = (email, password) => async dispatch => {
  dispatch({
    type: actions.LOGIN_REQUESTED
  });

  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);

    const userInfo = firebase.auth().currentUser;

    dispatch(loginSuccessfulActionCreator(userInfo));
  } catch (error) {
    // TODO: Change payload from the mesage we get from firebase to a custom message based on error code
    // Firebase message gives users more information then is needed
    dispatch({
      type: actions.LOGIN_FAILED,
      payload: error.message
    });
  }
};

export const loginSuccessfulActionCreator = payload => ({
  type: actions.LOGIN_SUCCEEDED,
  payload
});

/*
    Logging out
*/
export const logoutActionCreator = () => async dispatch => {
  dispatch({
    type: actions.LOGOUT_REQUESTED
  });
  try {
    await firebase.auth().signOut();
    dispatch({
      type: actions.LOGOUT_SUCCEEDED
    });
  } catch (error) {
    dispatch({
      type: actions.LOGOUT_FAILED,
      payload: error.message
    });
  }
};

/*
    registering
*/
export const registerActionCreator = (email, password) => async dispatch => {
  dispatch({
    type: actions.REGISTER_REQUESTED
  });
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    dispatch(verifyEmailActionCreator());
    // await firebase.auth().currentUser.sendEmailVerification();
    dispatch({
      type: actions.REGISTER_SUCCEEDED
    });
  } catch (error) {
    dispatch({
      type: actions.REGISTER_FAILED,
      payload: error.message
    });
  }
};

/*
    Verifying email
*/
export const verifyEmailActionCreator = () => async dispatch => {
  dispatch({
    type: actions.VERIFICATION_EMAIL_SENDING
  });
  try {
    await firebase.auth().currentUser.sendEmailVerification();
    dispatch({
      type: actions.VERIFICATION_EMAIL_SENT
    });
  } catch (error) {
    dispatch({
      type: actions.VERIFICATION_EMAIL_FAILED,
      payload: error.message || null
    });
  }
};

export const verifiedEmailActionCreator = () => async dispatch => {
  loginSuccessfulActionCreator(firebase.auth().currentUser);
  dispatch({
    type: actions.EMAIL_VERIFIED
  });
};
