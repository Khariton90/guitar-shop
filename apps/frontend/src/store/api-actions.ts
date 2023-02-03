import { ApiRoute } from './../consts';
import { AppDispatch, State } from './../types/state';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from 'axios';


export const fetchProductsAction = createAsyncThunk<void, undefined, {dispatch: AppDispatch, state: State, extra: AxiosInstance}>(
  'data/fetchProducts',
  async (_arg, {dispatch, extra: api}) => {
    const { data } = await api.get(ApiRoute.ProductList);
    console.log(data);
  }
);