import { ProductDto } from './../../types/product.dto';
import { loadProducts } from './../action';
import { createReducer } from '@reduxjs/toolkit';

type DataState = {
  products: ProductDto[]
}

const initialState: DataState = {
  products: []
}


const dataReducer = createReducer(initialState, (builder) => {
  builder.addCase(loadProducts, (state, action) => {
    state.products = action.payload;
  })
});

export { dataReducer };