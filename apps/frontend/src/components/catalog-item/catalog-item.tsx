import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { AppRoute } from "../../consts";
import { deleteProduct } from "../../store/api-actions";
import { priceFormat } from "../../utils";

type CatalogItemProps = {
  id: string;
  title: string;
  date: Date | string;
  image: string;
  price: number;
  onDeleteItem: (id: string) => void
}

export function CatalogItem({ title, date, price, image, id, onDeleteItem }: CatalogItemProps): JSX.Element {
  return (
    <li className="catalog-item">
      <div className="catalog-item__data">
        <img src={image} srcSet={image} width="36" height="93" alt="Картинка гитары" />
        <div className="catalog-item__data-wrapper">
          <p className="catalog-item__data-title">{title}</p>
          <div className="rate catalog-item__data-rate">
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <p className="visually-hidden">Оценка: Хорошо</p>
          </div>
          <p className="catalog-item__data-date">Дата добавления {dayjs(date).format('DD.MM.YYYY')}</p>
          <p className="catalog-item__data-price">{priceFormat(price)}</p>
        </div>
      </div>
      <div className="catalog-item__buttons"><Link className="button button--small button--black-border" to={AppRoute.ProductChange} aria-label="Редактировать товар">Редактировать</Link>
        <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар" onClick={() => onDeleteItem(id)}>Удалить</button>
      </div>
    </li>
  )
}