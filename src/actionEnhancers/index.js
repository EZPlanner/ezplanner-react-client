import { push } from 'connected-react-router';
import actions from '../actions';
import { plannerActionCreator } from '../actionCreators';

export const routeActionEnhancer = store => next => action => {
  switch (action.type) {
  case actions.LOGIN_SUCCEEDED:
    next(action);
    localStorage.setItem('ezplanner.expectSignIn', '1');
    store.dispatch(push('/dashboard'));
    break;
  case actions.LOGOUT_SUCCEEDED:
    next(action);
    localStorage.removeItem('ezplanner.expectSignIn');
    store.dispatch(push('/'));
    break;
  case actions.ADD_COURSE:
  case actions.REMOVE_COURSE:
    next(action);
    store.dispatch(plannerActionCreator(store.getState().coursesInput));
    break;
  default:
    next(action);
    break;
  }
};
