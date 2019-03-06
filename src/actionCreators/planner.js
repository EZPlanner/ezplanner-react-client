import actions from '../actions';
import { plan_eligible, plan_free } from '../services/planner';

export const plannerActionCreator = coursesTaken => async dispatch => {
  dispatch({
    type: actions.PLANNER_REQUESTED
  });

  const { data: payload_eligible } = await plan_eligible(coursesTaken);
  const { data: payload_free } = await plan_free(coursesTaken);
  try {
    dispatch({
      type: actions.PLANNER_SUCCEEDED,
      payload: payload_eligible
    });
    dispatch({
      type: actions.PLANNER_NOREQS,
      payload: payload_free
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
