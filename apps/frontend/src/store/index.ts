import { rootReducer } from './root-reducer';
import { redirect } from '../middlewares/redirect';
// import { createApi } from './../services/api';
import { configureStore } from '@reduxjs/toolkit';

// export const api = createApi();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // thunk: {
      //   extraArgument: api,
      // }
    }).concat(redirect),
});