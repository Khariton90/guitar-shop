
export enum AppRoute {
  Main = '/',
  AddProduct = '/addProduct',
  Product = '/product/:id',
  ProductList = '/products',
  ProductChange = '/product/change/:id',
  OrderList = '/orders',
  Order = '/order/:id',
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
  Register = 'users/register',
}