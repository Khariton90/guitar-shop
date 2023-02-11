export const DEFAULT_QTY = 1;

export enum AppRoute {
  Main = '/',
  AddProduct = '/add-product',
  Product = '/product/:id',
  ProductList = '/products',
  ProductChange = '/product/change/:id',
  OrderList = '/orders',
  Order = '/orders/:id',
  Cart = '/cart',
  NotFound = '*',
  Login = '/login',
  Register = '/register'
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum ApiRoute {
  ProductList = 'products',
  Login = 'auth',
  Refresh = 'auth/refresh',
  Logout = 'auth/logout',
  Register = 'users/register',
  CommentList = 'comments',
  DeleteProduct = 'products/delete',
  CreateOrder = 'orders/create',
  OrderList = 'orders'
}

export enum CommentСharacteristics {
  Min = 50,
  Max = 100
}

export enum CommentText {
  Min = 5,
  Max = 1024
}

export type Id = string;

export const TIME_OUT_DEBOUNCE = 500;
export const PAGINATION_BUTTON_COUNT = 3;