import { loadOrderList } from './../action';
import { createReducer } from '@reduxjs/toolkit';
import { OrderRdo } from '../../types/order.dto';

type OrderState = {
  orders: OrderRdo[],
  order: OrderRdo | null
}

const initialState: OrderState = {
  orders: [],
  order: null
}

const orderReducer = createReducer(initialState, (builder) => {
  builder.addCase(loadOrderList, (state, action) => {
    state.orders = action.payload;
  });
});

export { orderReducer };