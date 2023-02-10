import dayjs from "dayjs";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getProductCard } from "../../store/action";
import { ProductDto } from "../../types/product.dto";
import { priceFormat } from "../../utils";

type CatalogItemProps = {
  cart: ProductDto,
  onShowHideCard: (card: ProductDto) => void
}

export function CatalogItem({ cart, onShowHideCard }: CatalogItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const changeCard = useAppSelector(({ dataReducer }) => dataReducer.productCard);

  const handleClickItem = () => {
    dispatch(getProductCard(cart));
  }

  if (changeCard) {
    return <Navigate to={`/product/change/${changeCard.id}`} />
  }

  return (
    <li className="catalog-item">
      <div className="catalog-item__data">
        <img src={cart.image} srcSet={cart.image} width="36" height="93" alt="Картинка гитары" />
        <div className="catalog-item__data-wrapper">
          <p className="catalog-item__data-title">{cart.title}</p>
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
          <p className="catalog-item__data-date">Дата добавления {dayjs(cart.date).format('DD.MM.YYYY')}</p>
          <p className="catalog-item__data-price">{priceFormat(cart.price)}</p>
        </div>
      </div>
      <div className="catalog-item__buttons">
        <button className="button button--small button--black-border" aria-label="Редактировать товар" onClick={handleClickItem}>Редактировать</button>
        <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар" onClick={() => onShowHideCard(cart)}>Удалить</button>
      </div>
    </li>
  )
}