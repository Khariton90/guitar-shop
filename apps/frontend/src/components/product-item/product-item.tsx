import { AuthStatus, DEFAULT_QTY } from "../../consts";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addToCart } from "../../store/action";
import { getOneProduct } from "../../store/api-actions";
import { ProductDto } from "../../types/product.dto";
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { priceFormat } from "../../utils";
import { ModalCartAdd } from "../modal-cart-add/modal-cart-add";

type ProductItemProps = {
 product: ProductDto,
 onShowModal: (value: boolean) => void;
}

export function ProductItem({ product, onShowModal}: ProductItemProps): JSX.Element {
  const authStatus = useAppSelector(({userReducer}) => userReducer.autorizationStatus);
  const cartProducts = useAppSelector(({ cartReducer }) => cartReducer.cart);
  const dispatch = useAppDispatch();
  const [confirmModal, setConfirmModal] = useState(false);

  const handleClick = (evt: MouseEvent) => {
    evt.preventDefault();
    if (authStatus !== AuthStatus.Auth) {
      onShowModal(true);
      return;
    }

    setConfirmModal(true);
  }

  const handleNavigate = (evt: MouseEvent, id: string) => {
    evt.preventDefault();
    dispatch(getOneProduct(id));
  };

  const onChangeConfirm = (value: boolean) => {
    setConfirmModal(value);
  }

  const onAddToCart = () => {
    dispatch(addToCart({product: product, qty: DEFAULT_QTY}));
  };

  const isCart = cartProducts.some((item) => item.product.id === product.id);

  const keyPressCloseModal = useCallback((evt: KeyboardEvent) => {
    if (evt.key === "Escape") {
      setConfirmModal(false);
    }
  }, []);

  useEffect(() => {
    if (confirmModal) {
      document.body.addEventListener('keydown', keyPressCloseModal);
      document.body.style.overflow = 'hidden';
    }

    return function cleanup() {
      document.body.removeEventListener('keydown', keyPressCloseModal);
      document.body.style.overflow = '';
    }
  }, [confirmModal, dispatch, keyPressCloseModal]);

  return (
    <> 
    {
    confirmModal ? 
    <ModalCartAdd 
    product={product} 
    onChangeConfirm={onChangeConfirm} 
    onAddToCart={onAddToCart}/> : 
    null
    }
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
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{priceFormat(product.price)}
        </p>
      </div>
      <div className="product-card__buttons"><a className="button button--mini" href="/" onClick={(evt) => handleNavigate(evt, product.id)}>Подробнее</a>
        {isCart ? <button className="button button--red-border button--mini button--in-cart">В Корзине</button> :
          <button className="button button--red button--mini button--add-to-cart" onClick={handleClick}>Купить</button>}
      </div>
    </div></>
  );
}
