import firebase from '../services/firebase';
import actions from '../actions';

export * from './login';

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
      dispatch({
        type: actions.PLANNER_SUCCEEDED,
        payload: payloadResponse
      });
    } else {
      dispatch({
        type: actions.PLANNER_SUCCEEDED,
        payload: []
      });
    }
  } catch (error) {
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
    dispatch({
      type: actions.LOGOUT_FAILED,
      payload: error.message
    });
  }
};

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
