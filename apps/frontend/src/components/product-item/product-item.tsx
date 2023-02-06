import { AuthStatus } from "../../consts";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addToCart } from "../../store/action";
import { getOneProduct } from "../../store/api-actions";
import { ProductDto } from "../../types/product.dto";

type ProductItemProps = {
 product: ProductDto,
 onShowModal: (value: boolean) => void;
}

export function ProductItem({ product, onShowModal}: ProductItemProps): JSX.Element {
  const authStatus = useAppSelector(({userReducer}) => userReducer.autorizationStatus);

  const dispatch = useAppDispatch();
  const handleClick = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    if (authStatus !== AuthStatus.Auth) {
      onShowModal(true);
      return;
    }

    dispatch(addToCart(product));
  }

  const handleNavigate = (evt: { preventDefault: () => void; }, id: string) => {
    evt.preventDefault();
    dispatch(getOneProduct(id));
  };

  return (
    <div className="product-card">
      <img src="img/content/catalog-product-8.png" srcSet={product.image} width="75" height="190" alt="Roman RX" />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <p className="visually-hidden">Рейтинг: Хорошо</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>76</p>
        </div>
        <p className="product-card__title">{product.title}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{product.price} ₽
        </p>
      </div>
      <div className="product-card__buttons"><a className="button button--mini" href="/" onClick={(evt) => handleNavigate(evt, product.id)}>Подробнее</a>
        <a className="button button--red button--mini button--add-to-cart" href="/"  role="button" onClick={handleClick}>Купить</a>
      </div>
    </div>
  );
}
