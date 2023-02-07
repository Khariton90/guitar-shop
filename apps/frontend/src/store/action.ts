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

export const getProductComments = createAction('data/getProductComments', (data) => ({
  payload: data
}));

export const addToCart = createAction('data/addToCart', (data) => ({
  payload: data
}));

export const removeFromCart = createAction('data/removeFromCart', (data) => ({
  payload: data
}));

export const setLoadedStatus = createAction('data/setLoadedStatus', (data: boolean) => ({
  payload: data
}));

export const addNewComment = createAction('data/addNewComment', (data) => ({
  payload: data
}));

export const incrementQty = createAction('data/incrementQty', (data) => ({
  payload: data
}));

export const decrementQty = createAction('data/decrementQty', (data) => ({
  payload: data
}));