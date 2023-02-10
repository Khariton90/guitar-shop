import { UserDto } from './../../types/user.dto';
import { requireAutorization } from './../action';
import { createReducer } from '@reduxjs/toolkit';
import { AuthStatus } from '../../consts';
import { setUserData } from '../action';

type UserState = {
  user: UserDto | null,
  autorizationStatus: AuthStatus
}

const initialState: UserState = {
  user: null,
  autorizationStatus: AuthStatus.Auth
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUserData, (state, action) => {
    state.user = action.payload
  }).addCase(requireAutorization, (state, action) => {
    state.autorizationStatus = action.payload;
  })
});

export {userReducer};