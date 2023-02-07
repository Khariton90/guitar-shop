import { CartItem } from "../../components/cart-item/cart-item";
import { useAppDispatch, useAppSelector } from "../../hooks"
import { Link } from 'react-router-dom';
import { AppRoute } from "../../consts";
import { removeFromCart } from "../../store/action";

export function CartPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const onRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  }

  const products = useAppSelector(({dataReducer}) => dataReducer.cart);
  const amount = products.reduce((acc, element) => element.product.price * element.qty + acc, 0);

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
            { products.length ? products.map((product) => <CartItem {...product} key={product.product.id} onRemoveFromCart={onRemoveFromCart}/>) : 
            <p>В корзине нет товаров</p> }       
            {
              products.length ?
              <div className="cart__footer">
              <div className="cart__total-info">
                <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{amount} ₽</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">{amount} ₽</span></p>
                <button className="button button--red button--big cart__order-button">Оформить заказ</button>
              </div>
            </div> : null
            } 
          </div>
        </div>
      </main>
  )
}