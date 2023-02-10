import { combineReducers } from '@reduxjs/toolkit';
import { cartReducer } from './cart-reducer/cart-reducer';
import { dataReducer } from './data-reducer/data-reducer';
import { orderReducer } from './order-reducer/order-reducer';
import { userReducer } from './user-reducer/user-reducer';

export const rootReducer = combineReducers({
  userReducer,
  dataReducer,
  cartReducer,
  orderReducer
});