import actions from '../actions';
import { plan } from '../services/planner';

export const plannerActionCreator = coursesTaken => async dispatch => {
  dispatch({
    type: actions.PLANNER_REQUESTED
  });

  const { data: payload } = await plan(coursesTaken);

  try {
    dispatch({
      type: actions.PLANNER_SUCCEEDED,
      payload
    });
  } catch (error) {
    dispatch({
      type: actions.PLANNER_FAILED,
      payload: error.message
    });
  }
};

export const addCourseActionCreator = course => ({
  type: actions.ADD_COURSE,
  payload: course
});

export const removeCourseActionCreator = course => ({
  type: actions.REMOVE_COURSE,
  payload: course
});
