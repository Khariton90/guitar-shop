import { ProductDto } from './../types/product.dto';
import { ApiRoute, AppRoute, AuthStatus } from './../consts';
import { AppDispatch, State } from './../types/state';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from 'axios';
import { loadProducts, redirectToRoute, requireAutorization, setUserData } from './action';
import { UserDto } from '../types/user.dto';
import { AuthData, RegisterData } from '../types/auth-data';

export const fetchProductsAction = createAsyncThunk<void, undefined, {dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'data/fetchProducts',
  async (_arg, {dispatch, extra: api}) => {
    const { data } = await api.get<ProductDto[]>(ApiRoute.ProductList);
    dispatch(loadProducts(data));
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {dispatch: AppDispatch,state: State,extra: AxiosInstance}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserDto>(ApiRoute.Login, {email, password});
    dispatch(requireAutorization(AuthStatus.Auth));
    dispatch(setUserData(data));
    dispatch(redirectToRoute(AppRoute.Main)); 
  },
);

export const registerUserAction = createAsyncThunk<void, RegisterData, {dispatch: AppDispatch,state: State,extra: AxiosInstance}>(
  'user/register',
  async ({username, email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserDto>(ApiRoute.Register, {username, email, password});
  
    dispatch(redirectToRoute(AppRoute.Login)); 
  },
);