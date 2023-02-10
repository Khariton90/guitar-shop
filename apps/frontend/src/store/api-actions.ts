import { OrderDto } from './../types/order.dto';
import { saveToken } from './../services/token';
import { CommentDto } from './../types/comment.dto';
import { ProductDto } from './../types/product.dto';
import { ApiRoute, AppRoute, Id } from './../consts';
import { AppDispatch, State } from './../types/state';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from 'axios';
import { loadProducts, redirectToRoute, setUserData, getProductCard, setProductImage, setProductCard, getProductComments, setLoadedStatus, changeFlagOrderSuccess, addToCart, clearCart } from './action';
import { UserDto } from '../types/user.dto';
import { AuthData, RegisterData } from '../types/auth-data';
import { ProductSort } from '../types/product-sort.type';

export const fetchProductsAction = createAsyncThunk<void, ProductSort, {dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'data/fetchProducts',
  async ({type, sort}, {dispatch, extra: api}) => {
    const connectionString = type ? `${ApiRoute.ProductList}/?${type}=${sort}` : ApiRoute.ProductList;
    const { data } = await api.get<ProductDto[]>(connectionString);
    dispatch(loadProducts(data));
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {dispatch: AppDispatch,state: State,extra: AxiosInstance}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserDto>(ApiRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(setUserData(data));
    dispatch(redirectToRoute(AppRoute.Main)); 
  },
);

export const registerUserAction = createAsyncThunk<void, RegisterData, {dispatch: AppDispatch,state: State,extra: AxiosInstance}>(
  'user/register',
  async ({username, email, password}, {dispatch, extra: api}) => {
    await api.post<UserDto>(ApiRoute.Register, {username, email, password});
  
    dispatch(redirectToRoute(AppRoute.Login)); 
  },
);

export const getOneProduct = createAsyncThunk<void, Id, {dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'data/getOneProduct',
  async (id , {dispatch, extra: api}) => {
    const {data} = await api.get<ProductDto>(`${ApiRoute.ProductList}/${id}`);
    dispatch(getProductCard(data));
    dispatch(redirectToRoute(`product/${id}`)); 
  },
);

export const uploadProductImage = createAsyncThunk<void, FormData, {dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'data/uploadProductImage',
  async (file , {dispatch, extra: api}) => {
    const {data} = await api.post<string>(`${ApiRoute.ProductList}/images/upload`, file);
    dispatch(setProductImage(data))
  },
);

export const addProduct = createAsyncThunk<void, ProductDto, {dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'data/addProduct',
  async (product, {dispatch, extra: api}) => {
    const {data} = await api.post<ProductDto>(`${ApiRoute.ProductList}/create`, product);
    dispatch(setProductCard(data));
    dispatch(redirectToRoute(AppRoute.Main));
    dispatch(setProductImage(''));
    dispatch(setProductCard(null));
  },
);

export const deleteProduct = createAsyncThunk<void, Id, {dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'data/deleteProduct',
  async (id, {dispatch, extra: api}) => {
    await api.delete<void>(`${ApiRoute.DeleteProduct}/${id}`);
  },
);

export const fetchComments = createAsyncThunk<void, Id, {dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'data/fetchComments',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<CommentDto[]>(`${ApiRoute.CommentList}/${id}`);
    dispatch(getProductComments(data));
  },
);

export const addNewComment = createAsyncThunk<void, CommentDto, {dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'data/addNewComment',
  async ({id, author, dignities, disadvantage, comment, rating }, {dispatch, extra: api}) => {
    const {data} = await api.post<CommentDto>(`${ApiRoute.CommentList}/${id}`, {author, dignities, disadvantage, comment, rating});
    dispatch(setLoadedStatus(true));
    dispatch(addNewComment(data));
    dispatch(setLoadedStatus(false));
  },
);

export const addNewOrder = createAsyncThunk<void, OrderDto, {dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'data/addNewOrder',
  async ({products, amount, quantity, date }, {dispatch, extra: api}) => {
    await api.post<OrderDto>(`${ApiRoute.CreateOrder}`, { products, amount, quantity, date});
    dispatch(setLoadedStatus(true));
    dispatch(clearCart(null));
    dispatch(changeFlagOrderSuccess(true));
  },
);