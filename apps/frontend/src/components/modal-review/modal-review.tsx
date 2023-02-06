import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { addNewComment } from '../../store/api-actions';
import { ModalSuccessReview } from '../modal-success-review/modal-success-rewiew';

type ModalReviewProps = {
  title: string,
  onClickModalClose: () => void,
}

export function ModalReview({ title, onClickModalClose }: ModalReviewProps): JSX.Element {
  const modalOverlay = useRef(null);
  const params = useParams();
  const dispatch = useAppDispatch();
  const [showSuccess, setShowSuccess] = useState(false);

  const [formReview, setFormReview] = useState({
    author: "",
    dignities: "",
    disadvantage: "",
    comment: "",
    rating: "1"
  })

  const handleCloseModal = (evt: MouseEvent) => {
    if (modalOverlay.current === evt.target) {
      onClickModalClose();
    }
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (params.id) {
      dispatch(addNewComment({...formReview, id: params.id, date: new Date()}));
      setShowSuccess((prev) => (prev = true));
    }
  }

  const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormReview((prevForm) => ({
      ...prevForm,
      [evt.target.name]: evt.target.value
    }))
  }

  if (showSuccess) {
    return <ModalSuccessReview/>
  }

  return (
    <div>
      <div className="modal is-active modal--review modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal ref={modalOverlay} onClick={handleCloseModal}></div>
          <div className="modal__content">
            <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
            <form className="form-review" onSubmit={handleSubmit}>
              <div className="form-review__wrapper">
                <h3 className="form-review__title">{title}</h3>
                <div><span className="form-review__label form-review__label--required form-review__label--star">Ваша Оценка</span>
                  <div className="rate rate--reverse">
                    <input className="visually-hidden" id="star-5" name="rating" type="radio" value="5" onChange={handleChange}/>
                    <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                    <input className="visually-hidden" id="star-4" name="rating" type="radio" value="4" onChange={handleChange}/>
                    <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                    <input className="visually-hidden" id="star-3" name="rating" type="radio" value="3" onChange={handleChange}/>
                    <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                    <input className="visually-hidden" id="star-2" name="rating" type="radio" value="2" onChange={handleChange}/>
                    <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                    <input className="visually-hidden" id="star-1" name="rating" type="radio" value="1" onChange={handleChange}/>
                    <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                    <p className="rate__message">Поставьте оценку</p>
                  </div>
                </div>
              </div>
              <label className="form-review__label form-review__label--required" htmlFor="advantage">Достоинства</label>
              <input className="form-review__input" id="advantage" type="text" autoComplete="off" name="dignities" onChange={handleChange}/>
              <p className="form-review__warning">Заполните поле</p>
              <label className="form-review__label form-review__label--required" htmlFor="disadv">Недостатки</label>
              <input className="form-review__input" id="disadv" type="text" autoComplete="off" name="disadvantage"  onChange={handleChange}/>
              <p className="form-review__warning">Заполните поле</p>
              <label className="form-review__label form-review__label--required form-review__label--textarea" htmlFor="comment">Комментарий</label>
              <textarea className="form-review__input form-review__input--textarea" id="comment" autoComplete="off" name="comment" onChange={handleChange}></textarea>
              <p className="form-review__warning">Заполните поле</p>
              <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
            </form>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={() => onClickModalClose()}>
              <span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}