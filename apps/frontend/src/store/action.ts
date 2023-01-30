import { createAction } from '@reduxjs/toolkit';

export const getUserData = createAction('data/getUserData', (data) => ({
  payload: data
}));