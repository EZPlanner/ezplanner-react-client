import { mirrorKeys } from "../utils";
import firebase from '../services/firebase'

export const actions = mirrorKeys(
    'LOGIN_REQUESTED',
    'LOGIN_SUCCEEDED',
    'LOGIN_FAILED'
);

export const loginActionCreator = (email, password) => async (dispatch) => {
    dispatch({
        type: actions.LOGIN_REQUESTED
    });

    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);

        const userInfo = firebase.auth().currentUser;

        dispatch({
            type: actions.LOGIN_SUCCEEDED,
            payload: userInfo
        });
    } catch (error) {
        console.log(`ERROR LOGGING IN: ${error.code} - ${error.message}`);

        dispatch({
            type: actions.LOGIN_FAILED
        });
    }
}

export const loginSuccessfulActionCreator = payload => ({
    type: actions.LOGIN_SUCCEEDED,
    payload
})