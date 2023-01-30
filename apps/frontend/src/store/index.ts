import { rootReducer } from './root-reducer';
import { redirect } from '../middlewares/redirect';
import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({

    }).concat(redirect),
});