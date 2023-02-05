import { FormEvent, useCallback, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ModalEnter } from "../../components/modal-enter/modal-enter";
import { ProductItem } from "../../components/product-item/product-item";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchProductsAction } from "../../store/api-actions";
import cn from 'classnames';

export function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const products = useAppSelector(({ dataReducer }) => dataReducer.products);
  const [modal, setModal] = useState(false);
  const [submitForm, setSubmitForm] = useState({});
  const [sortDirection, setSortDirection] = useState<number | null>(null);
  const [sortType, setSortType] = useState<string | null>(null);

  console.log(useParams());

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  }

  const handleSort = (value: string) => {
    setSortType((prevType) => (prevType = value));
  }

  const showModal = (value: boolean) => {
    setModal((prev) => (prev = value));
  };

  const keyPressCloseModal = useCallback((evt: KeyboardEvent) => {
    if (evt.key === "Escape") {
      showModal(false);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchProductsAction({type: sortType, sort: sortDirection}));
    
    if (modal) {
      document.body.addEventListener('keydown', keyPressCloseModal);
      document.body.style.overflow = 'hidden';
    }

    return function cleanup() {
      document.body.removeEventListener('keydown', keyPressCloseModal);
      document.body.style.overflow = '';
    }
  }, [dispatch, keyPressCloseModal, modal, sortDirection, sortType])


  return (
    <>
      {!modal || <ModalEnter modal={modal} onShowModal={showModal} />}
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><NavLink className="link" to={'/'}>Главная</NavLink>
            </li>
            <li className="breadcrumbs__item"><a href="/" className="link">Каталог</a>
            </li>
          </ul>
          <div className="catalog">
            <form className="catalog-filter" onSubmit={handleSubmit}>
              <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Цена, ₽</legend>
                <div className="catalog-filter__price-range">
                  <div className="form-input">
                    <label className="visually-hidden">Минимальная цена</label>
                    <input type="number" placeholder="1 000" id="priceMin" name="от" />
                  </div>
                  <div className="form-input">
                    <label className="visually-hidden">Максимальная цена</label>
                    <input type="number" placeholder="30 000" id="priceMax" name="до" />
                  </div>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Тип гитар</legend>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic" />
                  <label htmlFor="acoustic">Акустические гитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="electric" name="electric" defaultChecked />
                  <label htmlFor="electric">Электрогитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" defaultChecked />
                  <label htmlFor="ukulele">Укулеле</label>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Количество струн</legend>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" defaultChecked />
                  <label htmlFor="4-strings">4</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" defaultChecked />
                  <label htmlFor="6-strings">6</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" />
                  <label htmlFor="7-strings">7</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" disabled />
                  <label htmlFor="12-strings">12</label>
                </div>
              </fieldset>
              <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
            </form>
            <div className="catalog-sort">
              <h2 className="catalog-sort__title">Сортировать:</h2>
              <div className="catalog-sort__type">
                <button className="catalog-sort__type-button" aria-label="по цене" onClick={() => handleSort('price')}>по цене</button>
                <button className="catalog-sort__type-button" aria-label="по популярности" onClick={() => handleSort('rating')}>по популярности</button>
              </div>
              <div className="catalog-sort__order">
                <button className={cn("catalog-sort__order-button catalog-sort__order-button--up", {"button__red": sortDirection === 1})} aria-label="По возрастанию" onClick={() => setSortDirection(1)}></button>
                <button className={cn("catalog-sort__order-button catalog-sort__order-button--down", {"button__red": sortDirection === -1})} aria-label="По убыванию" onClick={() => setSortDirection(-1)}></button>
              </div>
            </div>
            <div className="cards catalog__cards">
              {products.map((product) => <ProductItem key={product.id} product={product} onShowModal={showModal} />)}
            </div>
            <div className="pagination page-content__pagination">
              <ul className="pagination__list">
                <li className="pagination__page pagination__page--active"><a className="link pagination__page-link" href="1">1</a>
                </li>
                <li className="pagination__page"><a className="link pagination__page-link" href="2">2</a>
                </li>
                <li className="pagination__page"><a className="link pagination__page-link" href="3">3</a>
                </li>
                <li className="pagination__page pagination__page--next" id="next"><a className="link pagination__page-link" href="2">Далее</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}