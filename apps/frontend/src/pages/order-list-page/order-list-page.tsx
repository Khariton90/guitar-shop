import dayjs from "dayjs";
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { deleteOrder, fetchOrderList } from "../../store/api-actions";
import { priceFormat } from "../../utils";
import { OrderRdo } from '../../types/order.dto';
import { Link, useNavigate } from "react-router-dom";
import { AppRoute } from "../../consts";

type OrderListItemProps = {
  orderItem: OrderRdo
}

const OrderListItem = ({orderItem}: OrderListItemProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleNavigate = (id: string) => {
    navigate(`${AppRoute.OrderList}/${id}`);
  }

  return (
    <li className="orders__item">
      <h3 className="orders__number" onClick={() => handleNavigate(orderItem.id)}>Заказ №00-000-000</h3><span className="orders__items">товаров&nbsp;
      <b className="orders__items-qty">{orderItem.products.length}</b></span><span className="orders__date">{dayjs(orderItem.date).format('DD.MM.YYYY')}</span>
      <b className="orders__sum">{ priceFormat(orderItem.amount) }<span className="orders__rouble"></span></b>
      <button className="button button--small orders__remove-button" type="button" onClick={() => dispatch(deleteOrder(orderItem.id))}>Удалить</button>
    </li>
  )
}

export function OrderListPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const orderList = useAppSelector(({ orderReducer }) => orderReducer.orders);

  useEffect(() => {
    dispatch(fetchOrderList(1));
  }, [dispatch])

  return (
    <main className="page-content orders__main">
      <section className="orders">
        <div className="container">
          <h1 className="title title--bigger orders__title">Список заказов</h1>
          <ul className="breadcrumbs orders__breadcrumps">
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Main}>Каталог</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.OrderList}>Заказы</Link>
            </li>
          </ul>
          <div className="catalog-sort">
            <h2 className="catalog-sort__title">Сортировать:</h2>
            <div className="catalog-sort__type">
              <button className="catalog-sort__type-button catalog-sort__type-button--active" aria-label="по дате">по дате</button>
              <button className="catalog-sort__type-button" aria-label="по цене">по цене</button>
            </div>
            <div className="catalog-sort__order">
              <button className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию"></button>
              <button className="catalog-sort__order-button catalog-sort__order-button--down" aria-label="По убыванию"></button>
            </div>
          </div>
          <ul className="orders__list">
            { orderList.length ? 
              orderList.map((orderItem) => <OrderListItem orderItem={orderItem} key={orderItem.id} />) :
              <h3>Список заказов пуст</h3>  
          }
          </ul>
          <div className="pagination orders__pagination">
            <ul className="pagination__list">
              <li className="pagination__page pagination__page--active"><a className="link pagination__page-link" href="1">1</a>
              </li>
              <li className="pagination__page"><a className="link pagination__page-link" href="2">2</a>
              </li>
              <li className="pagination__page"><a className="link pagination__page-link" href="3">3</a>
              </li>
              <li className="pagination__page pagination__page--next" id="next"><a className="link pagination__page-link" href="2">Далее</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}