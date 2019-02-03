import actions from '../actions';
import firebase from '../services/firebase';

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
