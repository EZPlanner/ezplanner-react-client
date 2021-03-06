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
    if (userInfo.emailVerified) {
      dispatch({
        type: actions.EMAIL_VERIFIED
      });
    }

    dispatch(loginSuccessfulActionCreator(userInfo));
  } catch (error) {
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
    dispatch(sendVerifyEmailActionCreator());
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
export const sendVerifyEmailActionCreator = () => async dispatch => {
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

export const verifiedEmailActionCreator = oobCode => async dispatch => {
  if (oobCode === 'VERIFIED') {
    dispatch({
      type: actions.EMAIL_VERIFIED
    });
    return;
  }
  try {
    await firebase.auth().applyActionCode(oobCode);
    dispatch({
      type: actions.EMAIL_VERIFIED
    });
  } catch (error) {
    dispatch({
      type: actions.VERIFICATION_EMAIL_FAILED,
      payload: error.message || null
    });
  }
};
