import { useCallback, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom"
import { AppRoute } from "../../consts"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { ModalReview } from "../../components/modal-review/modal-review";
import { getOneProduct } from "../../store/api-actions";
import cn from 'classnames';
import Comments from "../../components/comments/comments";

export function ProductItemPage(): JSX.Element {
  const productCard = useAppSelector(({ dataReducer }) => dataReducer.productCard);
  const comments = useAppSelector(({ dataReducer }) => dataReducer.comments);
  const dispatch = useAppDispatch();
  const params = useParams();
  const [tab, setTab] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = (evt: { preventDefault: () => void; }, value: boolean) => {
    evt.preventDefault();
    setTab((prevValue) => (prevValue = value));
  }

  const onClickModalClose = () => {
    setShowModal(false);
  }

  const keyPressCloseModal = useCallback((evt: KeyboardEvent) => {
    if (evt.key === "Escape") {
      setShowModal(false);
    }
  }, []);

  const onShowModal = () => {
    setShowModal(true);
  }

  useEffect(() => {
    if (showModal) {
      document.body.addEventListener('keydown', keyPressCloseModal);
      document.body.style.overflow = 'hidden';
    }

    if (!productCard && params.id) {
      dispatch(getOneProduct(params.id));
    }

    return function cleanup() {
      document.body.removeEventListener('keydown', keyPressCloseModal);
      document.body.style.overflow = '';
    }
  }, [comments.length, dispatch, keyPressCloseModal, params.id, productCard, showModal]);

  if (!productCard) {
    return <div>Загрузка...</div>
  }

  return (
    <>
      {showModal ? <ModalReview title={productCard.title}  onClickModalClose={onClickModalClose}/> : null}
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Товар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><NavLink className="link" to={AppRoute.Main}>Главная</NavLink>
            </li>
            <li className="breadcrumbs__item"><NavLink className="link" to={AppRoute.Main}>Каталог</NavLink>
            </li>
            <li className="breadcrumbs__item"><NavLink className="link" to="">Товар</NavLink>
            </li>
          </ul>
          <div className="product-container">
            <img className="product-container__img" src={productCard.image} srcSet={productCard.image} width="90" height="235" alt="" />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{productCard.title}</h2>
              <div className="rate product-container__rating">
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
                <p className="visually-hidden">Рейтинг: Хорошо</p>
                <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>15</p>
              </div>
              <div className="tabs">
                <a className={cn("button button--medium tabs__button", { "button--black-border": tab })} href="#characteristics" onClick={(evt) => handleClick(evt, false)}>Характеристики</a>
                <a className={cn("button button--medium tabs__button", { "button--black-border": !tab })} href="#description" onClick={(evt) => handleClick(evt, true)}>Описание</a>
                <div className="tabs__content" id="characteristics">
                  <table className={cn("tabs__table", { "hidden": tab })}>
                    <tbody>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Артикул:</td>
                        <td className="tabs__value">{productCard.article}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Тип:</td>
                        <td className="tabs__value">{productCard.type}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Количество струн:</td>
                        <td className="tabs__value">{productCard.strings} струнная</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className={cn("tabs__product-description", { "hidden": !tab })}>{productCard.description}</p>
                </div>
              </div>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{productCard.price} ₽</p>
              <a className="button button--red button--big product-container__button" href="/">Добавить в корзину</a>
            </div>
          </div>
          <Comments id={params.id} onShowModal={onShowModal}/>
        </div>
      </main>
    </>
  )
}