import { ProductDto } from './../../types/product.dto';
import { loadProducts, getProductCard, setProductImage, setProductCard } from './../action';
import { createReducer } from '@reduxjs/toolkit';

type DataState = {
  products: ProductDto[],
  productCard: ProductDto | null,
  productImage: string
}

const initialState: DataState = {
  products: [],
  productCard: null,
  productImage: ''
}


const dataReducer = createReducer(initialState, (builder) => {
  builder.addCase(loadProducts, (state, action) => {
    state.products = action.payload;
  }).addCase(getProductCard, (state, action) => {
    state.productCard = action.payload;
  }).addCase(setProductImage, (state, action) => {
    state.productImage = action.payload;
  }).addCase(setProductCard, (state, action) => {
    state.productCard = action.payload;
  })
});

export { dataReducer };