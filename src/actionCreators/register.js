import firebase from '../services/firebase';
import actions from '../actions';

export const registerActionCreator = (email, password) => async dispatch => {
  dispatch({
    type: actions.REGISTER_REQUESTED
  });
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);

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
