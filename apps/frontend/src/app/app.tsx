import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout/layout';
import { AppRoute } from '../consts';
import { MainPage } from '../pages/main-page/main-page';
import { LoginPage } from '../pages/login-page/login-page';
import { ProductItemPage } from '../pages/product-item-page/product-item-page';
import { ProductListPage } from '../pages/product-list-page/product-list-page';
import { NotFoundPage } from '../pages/not-found-page/not-found-page';
import { CartPage } from '../pages/cart-page/cart-page';
import { OrderListPage } from '../pages/order-list-page/order-list-page';
import { OrderItemPage } from '../pages/order-item-page/order-item-page';
import { AddProductItemPage } from '../pages/add-product-item-page/add-product-item-page';
import { ChangeProductItemPage } from '../pages/change-product-item-page/change-product-item-page';

export function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<Layout />}>
        <Route path={AppRoute.Main} element={<MainPage />}/>
        <Route path={AppRoute.Login} element={<LoginPage />}/>
        <Route path={AppRoute.Product} element={<ProductItemPage />}/>
        <Route path={AppRoute.ProductList} element={<ProductListPage />}/>
        <Route path={AppRoute.AddProduct} element={<AddProductItemPage />}/>
        <Route path={AppRoute.ProductChange} element={<ChangeProductItemPage />}/>
        <Route path={AppRoute.Cart} element={<CartPage />}/>
        <Route path={AppRoute.OrderList} element={<OrderListPage />}/>
        <Route path={AppRoute.Order} element={<OrderItemPage />}/>
        <Route path={AppRoute.NotFound} element={<NotFoundPage />}/>
      </Route>
    </Routes>
  );
}

export default App;
