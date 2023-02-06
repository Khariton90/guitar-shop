import { CartItem } from "../../components/cart-item/cart-item";
import { useAppSelector } from "../../hooks"
import { Link } from 'react-router-dom';
import { AppRoute } from "../../consts";

export function CartPage(): JSX.Element {
  const products = useAppSelector(({dataReducer}) => dataReducer.cart);

  return (
    <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Main}>Главная</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Main}>Каталог</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Cart}>Корзина</Link>
            </li>
          </ul>
          <div className="cart">
            { products.map((product) => <CartItem product={product}/>) }
            <div className="cart__footer">
              <div className="cart__total-info">
                <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">52 000 ₽</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">52 000 ₽</span></p>
                <button className="button button--red button--big cart__order-button">Оформить заказ</button>
              </div>
            </div>
          </div>
        </div>
      </main>
  )
}