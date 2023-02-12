import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { fetchOrderList } from "../../store/api-actions";
import { Link } from "react-router-dom";
import { AppRoute } from "../../consts";
import { OrderListItem } from "../../components/order-list-item/order-list-item";
import { PageContentPagination } from "../../components/page-content-pagination/page-content-pagination";
import { ProductSort } from "../../types/product-sort.type";
import { SortDirection } from "@guitar-shop/shared-types";
import cn from 'classnames';
import { CatalogSortOrder } from "../../components/catalog-sort-order/catalog-sort-order";

export function OrderListPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const orderList = useAppSelector(({ orderReducer }) => orderReducer.orders);
  const [sortType, setSortType] = useState<keyof ProductSort & string>('price');
  
  const total = orderList.length;

  const [query, setQuery] = useState<ProductSort>({
    price: SortDirection.Desc,
    page: 1,
    date: SortDirection.Desc
  });

  const handleSort = (value: keyof ProductSort & string) => {
    setSortType((prevType) => (prevType = value));
  }

  const onSetQuery = (key: keyof ProductSort & string, value: number) => {
    setQuery((prev) => ({ ...prev, [key]: value }))
  }
  
  useEffect(() => {
    dispatch(fetchOrderList(query));
  }, [dispatch, query, sortType])

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
              <button className={cn("catalog-sort__type-button", {"catalog-sort__type-button--active": sortType === 'date'})} aria-label="по дате" onClick={() => handleSort('date')}>по дате</button>
              <button className={cn("catalog-sort__type-button", {"catalog-sort__type-button--active": sortType === 'price'})} aria-label="по цене" onClick={() => handleSort('price')}>по цене</button>
            </div>
            <CatalogSortOrder type={sortType} onSetQuery={onSetQuery} />
          </div>
          <ul className="orders__list">
            { orderList.length ? 
              orderList.map((orderItem) => <OrderListItem orderItem={orderItem} key={orderItem.id} />) :
              <h3>Список заказов пуст</h3>  
          }
          </ul>
          <PageContentPagination total={total} query={query} onSetQuery={onSetQuery}/>
        </div>
      </section>
    </main>
  )
}