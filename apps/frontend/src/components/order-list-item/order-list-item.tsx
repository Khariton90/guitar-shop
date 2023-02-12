import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../consts";
import { useAppDispatch } from "../../hooks";
import { deleteOrder } from "../../store/api-actions";
import { OrderRdo } from "../../types/order.dto";
import { priceFormat } from "../../utils";


type OrderListItemProps = {
  orderItem: OrderRdo
}

export function OrderListItem({orderItem}: OrderListItemProps): JSX.Element {
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