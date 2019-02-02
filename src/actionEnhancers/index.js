import { push } from 'connected-react-router';
import actions from '../actions';

export const routeActionEnhancer = store => next => action => {
  switch (action.type) {
  case actions.LOGIN_SUCCEEDED:
    store.dispatch(push('/dashboard'));
    next(action);
    break;
  case actions.LOGOUT_SUCCEEDED:
    store.dispatch(push('/'));
    next(action);
    break;
  default:
    next(action);
    break;
  }
};
