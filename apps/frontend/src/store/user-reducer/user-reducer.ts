import { createReducer } from '@reduxjs/toolkit';
import { getUserData } from '../action';

const initialState = {
  user: {}
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(getUserData, (state, action) => {
    state.user = action.payload
  })
});

export {userReducer};