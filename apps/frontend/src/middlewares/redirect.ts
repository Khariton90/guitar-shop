import { rootReducer } from './../store/root-reducer';
import { Middleware } from 'redux';
import browserHistory from '../browser-history';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === 'data/redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };