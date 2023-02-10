import { DEFAULT_QTY } from './../../consts';
import { CommentDto } from './../../types/comment.dto';
import { ProductDto } from './../../types/product.dto';
import { loadProducts, getProductCard, setProductImage, setProductCard, getProductComments, addToCart, setLoadedStatus, addNewComment, incrementQty, decrementQty, removeFromCart } from './../action';
import { createReducer } from '@reduxjs/toolkit';
import { CartProductItem } from '@guitar-shop/shared-types';

type DataState = {
  products: ProductDto[],
  productCard: ProductDto | null,
  productImage: string,
  comments: CommentDto[],
  cart: CartProductItem[],
  loadedStatus: boolean
}

const initialState: DataState = {
  products: [],
  productCard: null,
  productImage: '',
  comments: [],
  cart: [],
  loadedStatus: false
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
    if (action.payload) {
      state.cart.push({ ...action.payload })
    } else {
      state.cart = [];
    }
  }).addCase(setLoadedStatus, (state, action) => {
    state.loadedStatus = action.payload;
  }).addCase(incrementQty, (state, action) => {
    state.cart.forEach((item) => {
      if (item.product.id === action.payload) {
        item.qty += DEFAULT_QTY;
      }
    });
  }).addCase(decrementQty, (state, action) => {
    state.cart.forEach((item) => {
      if (item.product.id === action.payload && item.qty > 1) {
        item.qty -= DEFAULT_QTY;
      }
    });
  }).addCase(removeFromCart, (state, action) => {
    state.cart = state.cart.filter((item) => item.product.id !== action.payload);
  }).addCase(addNewComment, (state, action) => {
    state.comments.push(action.payload);
  })
});

export { dataReducer };