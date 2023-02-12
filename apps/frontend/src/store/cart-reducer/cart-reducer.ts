import { DEFAULT_QTY } from './../../consts';
import { ProductDto } from './../../types/product.dto';
import { getProductCard, setProductCard, addToCart, incrementQty, decrementQty, removeFromCart, clearCart } from './../action';
import { createReducer } from '@reduxjs/toolkit';
import { CartProductItem } from '@guitar-shop/shared-types';

type CartState = {
  productCard: ProductDto | null,
  cart: CartProductItem[],
}

const initialState: CartState = {
  productCard: null,
  cart: [],
}

const cartReducer = createReducer(initialState, (builder) => {
  builder.addCase(getProductCard, (state, action) => {
    state.productCard = action.payload;
  }).addCase(setProductCard, (state, action) => {
    state.productCard = action.payload;
  }).addCase(addToCart, (state, action) => {
    if (action.payload) {
      state.cart.push({ ...action.payload })
    } else {
      state.cart = [];
    }
  }).addCase(clearCart, (state, action) => {
    state.cart = [];
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
  })
});

export { cartReducer };