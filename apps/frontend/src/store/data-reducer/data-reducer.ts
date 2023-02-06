import { CommentDto } from './../../types/comment.dto';
import { ProductDto } from './../../types/product.dto';
import { loadProducts, getProductCard, setProductImage, setProductCard, getProductComments, addToCart } from './../action';
import { createReducer } from '@reduxjs/toolkit';

type DataState = {
  products: ProductDto[],
  productCard: ProductDto | null,
  productImage: string,
  comments: CommentDto[],
  cart: ProductDto[],
}

const initialState: DataState = {
  products: [],
  productCard: null,
  productImage: '',
  comments: [],
  cart: []
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
  }).addCase(getProductComments, (state, action) => {
    state.comments = action.payload;
  }).addCase(addToCart, (state, action) => {
    state.cart.push({...action.payload})
  })
});

export { dataReducer };