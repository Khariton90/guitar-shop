import { ProductDto } from './../../types/product.dto';
import { loadProducts, getProductCard } from './../action';
import { createReducer } from '@reduxjs/toolkit';

type DataState = {
  products: ProductDto[],
  productCard: ProductDto | null
}

const initialState: DataState = {
  products: [],
  productCard: null 
}


const dataReducer = createReducer(initialState, (builder) => {
  builder.addCase(loadProducts, (state, action) => {
    state.products = action.payload;
  }).addCase(getProductCard, (state, action) => {
    state.productCard = action.payload;
  })
});

export { dataReducer };