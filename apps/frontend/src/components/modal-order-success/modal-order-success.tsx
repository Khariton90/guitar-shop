import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { AppRoute } from "../../consts"
import { useAppDispatch } from "../../hooks";
import { changeFlagOrderSuccess, clearCart } from "../../store/action";

type ModalOrderSuccessProps = {
  orderSuccess: boolean
}

export function ModalOrderSuccess({orderSuccess}: ModalOrderSuccessProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const keyPressCloseModal = useCallback((evt: KeyboardEvent) => {
    if (evt.key === "Escape") {
      dispatch(clearCart(null));
      dispatch(changeFlagOrderSuccess(false));
    }
  }, [dispatch]);

  const handleNavigate = () => {
    dispatch(changeFlagOrderSuccess(false));
    dispatch(clearCart(null));
    navigate(AppRoute.Main);
  }

  const handleClearCart = () => {
    dispatch(clearCart(null));
    dispatch(changeFlagOrderSuccess(false));
  }

  useEffect(() => {
    if (orderSuccess) {
      document.body.addEventListener('keydown', keyPressCloseModal);
      document.body.style.overflow = 'hidden';
    }

    return function cleanup() {
      document.body.removeEventListener('keydown', keyPressCloseModal);
      document.body.style.overflow = '';
    }
  },[keyPressCloseModal, orderSuccess])

  return (
    <div className="modal is-active modal--success modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal></div>
        <div className="modal__content">
          <svg className="modal__icon" width="26" height="20" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <p className="modal__message">Спасибо за ваш заказ!</p>
          <div className="modal__button-container modal__button-container--send">
            <button className="button button--small modal__button modal__button--send" onClick={handleNavigate}>К покупкам!</button>
          </div>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={handleClearCart}>
            <span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  )
}