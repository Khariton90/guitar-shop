import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../consts';

export const redirectToRoute = createAction<AppRoute | string>('data/redirectToRoute');

export const loadProducts = createAction('data/loadProducts', (data) => ({
  payload: data
}));

export const setUserData = createAction('data/setUserData', (data) => ({
  payload: data
}));

export const requireAutorization = createAction('data/requireAutorization', (data) => ({
  payload: data
}));

export const getProductCard = createAction('data/getProductCard', (data) => ({
  payload: data
}));

export const setProductCard = createAction('data/setProductCard', (data) => ({
  payload: data
}));

export const setProductImage = createAction('data/setProductImage', (data) => ({
  payload: data
}));