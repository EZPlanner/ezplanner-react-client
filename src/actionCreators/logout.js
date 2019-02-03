import actions from '../actions';
import firebase from '../services/firebase';

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
