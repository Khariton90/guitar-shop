import { CartProductItem } from "@guitar-shop/shared-types";
import dayjs from "dayjs";
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom";
import { AppRoute } from "../../consts";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchOneOrder } from "../../store/api-actions";
import { priceFormat } from "../../utils";

type OrderListProductItemProps = {
  productItem: CartProductItem
}

const OrderListProductItem = ({productItem}: OrderListProductItemProps): JSX.Element => {
  const { product, qty } = productItem;

  return (
    <li className="order-list__item">
      <div className="order-list__data">
        <img src={product.image} srcSet={product.image} width="60" height="130" alt="Картинка гитары" />
        <div className="order-list__container">
          <p className="order-list__name">{product.title}</p>
          <p className="order-list__lot">Артикул: {product.article}</p>
          <p className="order-list__parameters">Электрогитара, {product.strings} струнная</p>
        </div>
      </div>
      <span className="order-list__quantity">{qty}</span>
      <span className="order-list__price">{priceFormat(product.price)}</span>
    </li>
  )
}

export function OrderItemPage(): JSX.Element {
  const orderItem = useAppSelector(({ orderReducer }) => orderReducer.order);
  const dispatch = useAppDispatch();
  const param = useParams();

  useEffect(() => {
    if (!orderItem && param.id) {
      dispatch(fetchOneOrder(param.id));
    }
  }, [dispatch, orderItem, param.id]);

  if (!orderItem) {
    return <div>Загрузка...</div>
  }

  return (
    <main className="page-content">
      <section className="order">
        <div className="container">
          <h1 className="order__title">Заказ № 00-000-000</h1>
          <ul className="breadcrumbs">
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Main}>Каталог</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.OrderList}> Заказы</Link>
            </li>
            <li className="breadcrumbs__item"><span className="link">Заказ № 00-000-000</span>
            </li>
          </ul>
          <table className="order-table">
            <tbody>
              <tr>
                <td>Общее количество товаров</td>
                <td>{orderItem.products.length}</td>
              </tr>
              <tr>
                <td>Дата заказа</td>
                <td>{dayjs(orderItem.date).format('DD.MM.YYYY')}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>К оплате</td>
                <td>{priceFormat(orderItem.amount)}</td>
              </tr>
            </tfoot>
          </table>
          <ul className="order__list order-list">
            { orderItem.products.map((product) => <OrderListProductItem productItem={product} key={product.product.id}/>) }
          </ul>
          <Link className="button order__button button--small button--black-border" to={AppRoute.OrderList}>Вернуться к списку заказов</Link>
        </div>
      </section>
    </main>
  )
}