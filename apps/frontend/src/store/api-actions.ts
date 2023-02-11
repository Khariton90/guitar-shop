import { OrderDto, OrderRdo } from './../types/order.dto';
import { saveToken, dropToken } from './../services/token';
import { CommentDto } from './../types/comment.dto';
import { ProductDto, ProductListDto } from './../types/product.dto';
import { ApiRoute, AppRoute, Id, AuthStatus } from './../consts';
import { AppDispatch, State } from './../types/state';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from 'axios';
import { 
  loadProducts, 
  redirectToRoute, 
  setUserData, 
  getProductCard, 
  setProductImage, 
  setProductCard, 
  getProductComments, 
  setLoadedStatus, 
  changeFlagOrderSuccess, 
  loadOrderList, 
  loadOneOrder,
  requireAutorization
} from './action';
import { UserDto } from '../types/user.dto';
import { AuthData, RegisterData } from '../types/auth-data';
import { ProductSort } from '../types/product-sort.type';

export const fetchProductsAction = createAsyncThunk<void, ProductSort, {dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'data/fetchProducts',
  async ({page, rating, price, date}, {dispatch, extra: api}) => {
    const connectionString = `${ApiRoute.ProductList}/?skip=${page}&rating=${rating}&price=${price}&date=${date}`;
    const { data } = await api.get<ProductListDto>(connectionString);
    dispatch(loadProducts(data));
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {dispatch: AppDispatch,state: State,extra: AxiosInstance}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post(ApiRoute.Login, {email, password});
    dispatch(setLoadedStatus(true));
    saveToken(data.refresh_token);
    dispatch(redirectToRoute(AppRoute.Main));
    dispatch(requireAutorization(AuthStatus.Auth));
    dispatch(authAction(data.refresh_token));
    dispatch(setLoadedStatus(false));
  },
);

export const authAction = createAsyncThunk<void, string, {dispatch: AppDispatch,state: State,extra: AxiosInstance}>(
  'user/authAction',
  async (refreshToken, {dispatch, extra: api}) => {
    const {data} = await api.post<UserDto>(ApiRoute.Refresh, {refreshToken});
    dispatch(setLoadedStatus(true));
    dispatch(setUserData(data));
    dispatch(requireAutorization(AuthStatus.Auth));
    dispatch(setLoadedStatus(false));
  },
);

export const logoutAction = createAsyncThunk<void, null, {dispatch: AppDispatch,state: State,extra: AxiosInstance}>(
  'user/logoutAction',
  async (_args, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(setUserData(null));
    dispatch(requireAutorization(AuthStatus.NoAuth));
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
    dispatch(setLoadedStatus(true));
    dispatch(getProductCard(data));
    dispatch(redirectToRoute(`product/${id}`)); 
    dispatch(setLoadedStatus(false));
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
  'order/addNewOrder',
  async ({products, amount, quantity, date }, {dispatch, extra: api}) => {
    await api.post<OrderDto>(`${ApiRoute.CreateOrder}`, { products, amount, quantity, date});
    dispatch(setLoadedStatus(true));
    dispatch(changeFlagOrderSuccess(true));
  },
);

export const fetchOrderList = createAsyncThunk<void, number, {dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'order/fetchOrderList',
  async (_args, {dispatch, extra: api}) => {
    const {data} = await api.get<OrderRdo[]>(`${ApiRoute.OrderList}`);
    dispatch(loadOrderList(data));
  },
);

export const fetchOneOrder = createAsyncThunk<void, Id, {dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'order/fetchOneOrder',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<OrderRdo>(`${ApiRoute.OrderList}/${id}`);
    dispatch(loadOneOrder(data));
  },
);

export const deleteOrder = createAsyncThunk<void, Id, {dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'order/deleteOrder',
  async (id, {dispatch, extra: api}) => {
    await api.delete(`${ApiRoute.OrderList}/${id}`);
    const {data} = await api.get<OrderRdo[]>(`${ApiRoute.OrderList}`);
    dispatch(loadOrderList(data));
  },
);