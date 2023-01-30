
export enum AppRoute {
  Main = '/',
  AddProduct = 'addProduct',
  Product = 'product/:id',
  ProductList = 'products',
  ProductChange = 'product/change/:id',
  OrderList = 'orders',
  Order = 'order/:id',
  Cart = 'cart',
  NotFound = '*',
  Login = 'login',
  Register = 'Register'
}