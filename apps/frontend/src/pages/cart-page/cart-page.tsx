import { CartItem } from "../../components/cart-item/cart-item";
import { useAppDispatch, useAppSelector } from "../../hooks"
import { Link } from 'react-router-dom';
import { AppRoute } from "../../consts";
import { removeFromCart, setLoadedStatus } from "../../store/action";
import { priceFormat } from "../../utils";
import { addNewOrder } from "../../store/api-actions";
import { OrderDto } from "../../types/order.dto";
import dayjs from "dayjs";
import { ModalOrderSuccess } from "../../components/modal-order-success/modal-order-success";
import { useEffect } from "react";

export function CartPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const products = useAppSelector(({ cartReducer }) => cartReducer.cart);
  const orderSuccess = useAppSelector(({ dataReducer }) => dataReducer.orderSuccess);
  const loadedStatus = useAppSelector(({ dataReducer }) => dataReducer.loadedStatus);
  const amount = products.reduce((acc, element) => element.product.price * element.qty + acc, 0);

  const onRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  }

  const handleClickAddOrder = () => {
    const newOrder: OrderDto = {
      products,
      amount,
      quantity: products.length,
      date: dayjs(new Date()).toDate()
    }
    dispatch(addNewOrder(newOrder));
  }

  useEffect(() => {
    if (loadedStatus) {
      dispatch(setLoadedStatus(false));
    }
  }, [dispatch, loadedStatus, orderSuccess])

  if (loadedStatus) {
    return <div>Загрузка...</div>
  }

  return (
    <>
      {orderSuccess ? <ModalOrderSuccess orderSuccess /> : null}
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
            {products.length ? products.map((product) => <CartItem {...product} key={product.product.id} onRemoveFromCart={onRemoveFromCart} />) :
              <p>В корзине нет товаров</p>}
            {products.length ?
              <div className="cart__footer">
                <div className="cart__total-info">
                  <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{priceFormat(amount)}</span></p>
                  <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">{priceFormat(amount)}</span></p>
                  <button className="button button--red button--big cart__order-button" onClick={handleClickAddOrder}>Оформить заказ</button>
                </div>
              </div> : null}
          </div>
        </div>
      </main></>
  )
}