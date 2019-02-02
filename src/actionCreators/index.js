import firebase from '../services/firebase';
import actions from '../actions';

export const loginActionCreator = (email, password) => async dispatch => {
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
    // TODO: Change payload from the mesage we get from firebase to a custom message based on error code
    // Firebase message gives users more information then is needed
    dispatch({
      type: actions.LOGIN_FAILED,
      payload: error.message
    });
  }
};

export const awsPlannerLamdaActionCreator = courses => async dispatch => {
  dispatch({
    type: actions.PLANNER_REQUESTED
  });

  let api_call = 'https://ezplanner-flask-api.herokuapp.com/api/planner?';
  for (let i = 0; i < courses.length; i++) {
    api_call += '&course=';
    api_call += String(courses[i]['label']);
  }

  try {
    let response = await fetch(api_call, {
      method: 'GET'
    });

    console.log(response);
    response = await response.json();
    if ((await response['data']) != null) {
      let payloadResponse = [];
      // ['ECE254', 'Operating Systems and Systems Programming', 'https://uwflow.com/course/ece254'],
      for (let i = 0; i < response['data'].length; i++) {
        // response['data'][i] returns a tuple
        payloadResponse.push([
          response['data'][i][0],
          response['data'][i][1],
          'https://uwflow.com/course/' +
            response['data'][i][0].toString().toLowerCase()
        ]);
      }
      console.log(payloadResponse);
      dispatch({
        type: actions.PLANNER_SUCCEEDED,
        payload: payloadResponse
      });
    } else {
      console.log('Empty body');
      dispatch({
        type: actions.PLANNER_SUCCEEDED,
        payload: []
      });
    }
  } catch (error) {
    console.log(
      `ERROR IN INVOKING AWS LAMDA: ${error.code} - ${error.message}`
    );
    dispatch({
      type: actions.PLANNER_FAILED,
      payload: error.message
    });
  }
};

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
    console.log(`ERROR REGISTERING: ${error.code} - ${error.message}`);
    dispatch({
      type: actions.REGISTER_FAILED,
      payload: error.message
    });
  }
};

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
    console.log(`ERROR LOGGING OUT: ${error.code} - ${error.message}`);
    dispatch({
      type: actions.LOGOUT_FAILED,
      payload: error.message
    });
  }
};

export const loginSuccessfulActionCreator = payload => ({
  type: actions.LOGIN_SUCCEEDED,
  payload
});

export const updateCoursesActionCreator = (courses, course) => dispatch => {
  if (course != null) {
    let courseToAdd = {
      key: courses.length || 0,
      label: course
    };
    courses = [...courses, courseToAdd];
  }
  dispatch({
    type: actions.UPDATE_COURSE_INPUTS,
    payload: courses
  });
};
