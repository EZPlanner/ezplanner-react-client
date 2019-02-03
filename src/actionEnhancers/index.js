import { push } from 'connected-react-router';
import actions from '../actions';

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
  default:
    next(action);
    break;
  }
};
