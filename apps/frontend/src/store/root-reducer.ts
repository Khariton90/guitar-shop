import { combineReducers } from '@reduxjs/toolkit';
import { dataReducer } from './data-reducer/data-reducer';
import { userReducer } from './user-reducer/user-reducer';

export const rootReducer = combineReducers({
  userReducer,
  dataReducer
});