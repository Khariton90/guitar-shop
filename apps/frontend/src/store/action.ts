import { createAction } from '@reduxjs/toolkit';

export const getUserData = createAction('data/getUserData', (data) => ({
  payload: data
}));

export const loadProducts = createAction('data/loadProducts', (data) => ({
  payload: data
}));