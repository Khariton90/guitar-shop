import { MouseEvent, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { useAppDispatch } from '../../hooks';
import { fetchComments } from '../../store/api-actions';

type ModalSuccessReview = {
  onClickModalClose: () => void,
}

export function ModalSuccessReview({ onClickModalClose }: ModalSuccessReview): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const param = useParams();
  const wrapper = useRef(null);

  const handleClose = (evt: MouseEvent) => {
    if (evt.target === wrapper.current) {
      onClickModalClose();
    }
  }

  useEffect(() => {
    if (param.id) {
      dispatch(fetchComments(param.id));
    }
  }, [dispatch, param.id]);

  return (
    <div>
      <div className="modal is-active modal--success modal-for-ui-kit" onClick={handleClose}>
        <div className="modal__wrapper" ref={wrapper}>
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">Спасибо за ваш отзыв!</p>
            <div className="modal__button-container modal__button-container--review">
              <button className="button button--small modal__button modal__button--review" onClick={() => navigate(AppRoute.Main)}>К покупкам!</button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={onClickModalClose}>
              <span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}