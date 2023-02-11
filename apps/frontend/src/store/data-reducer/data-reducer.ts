import { CommentDto } from './../../types/comment.dto';
import { ProductListDto } from './../../types/product.dto';
import { loadProducts, setProductImage, getProductComments, setLoadedStatus, addNewComment, changeFlagOrderSuccess } from './../action';
import { createReducer } from '@reduxjs/toolkit';

type DataState = {
  products: ProductListDto,
  productImage: string,
  comments: CommentDto[],
  loadedStatus: boolean,
  orderSuccess: boolean
}

const initialState: DataState = {
  products: {
    products: [],
    total: 0
  },
  productImage: '',
  comments: [],
  loadedStatus: false,
  orderSuccess: false
}

const dataReducer = createReducer(initialState, (builder) => {
  builder.addCase(loadProducts, (state, action) => {
    state.products = action.payload;
  }).addCase(setProductImage, (state, action) => {
    state.productImage = action.payload;
  }).addCase(getProductComments, (state, action) => {
    state.comments = action.payload;
  }).addCase(setLoadedStatus, (state, action) => {
    state.loadedStatus = action.payload;
  }).addCase(addNewComment, (state, action) => {
    state.comments.push(action.payload);
  }).addCase(changeFlagOrderSuccess, (state, action) => {
    state.orderSuccess = action.payload
  })
});

export { dataReducer };