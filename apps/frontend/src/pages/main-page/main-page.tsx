import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ModalEnter } from "../../components/modal-enter/modal-enter";
import { ProductItem } from "../../components/product-item/product-item";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchProductsAction } from "../../store/api-actions";
import { isFilteredCard } from "../../utils";
import cn from 'classnames';

const initialForm = {
  priceMin: '',
  priceMax: '',
  acoustic: '',
  electric: '',
  ukulele: '',
  fourStrings: '',
  sixStrings: '',
  sevenStrings: '',
  twelveStrings: '',
};

export function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const productsCard = useAppSelector(({ dataReducer }) => dataReducer.products);
  const [modal, setModal] = useState(false);
  const [submitForm, setChangeForm] = useState({
    priceMin: '',
    priceMax: '',
    acoustic: 'acoustic',
    electric: 'electric',
    ukulele: 'ukulele',
    fourStrings: '',
    sixStrings: '',
    sevenStrings: '',
    twelveStrings: '',
  });

  const handleChangeField = (evt: ChangeEvent<HTMLInputElement>) => {
    setChangeForm((prevForm) => ({
      ...prevForm,
      [evt.target.name]: evt.target.value,
    }));
  }

  const [sortDirection, setSortDirection] = useState<number | null>(null);
  const [sortType, setSortType] = useState<string | null>(null);

  const handleSubmit = (evt: FormEvent<HTMLFormElement | HTMLInputElement>) => {
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
    dispatch(fetchProductsAction({ type: sortType, sort: sortDirection }));

    if (modal) {
      document.body.addEventListener('keydown', keyPressCloseModal);
      document.body.style.overflow = 'hidden';
    }

    return function cleanup() {
      document.body.removeEventListener('keydown', keyPressCloseModal);
      document.body.style.overflow = '';
    }
  }, [dispatch, keyPressCloseModal, modal, sortDirection, sortType, submitForm])

  const products = productsCard
    .slice()
    .filter((product) => isFilteredCard(product, submitForm))
    .filter((product) => [submitForm.acoustic, submitForm.electric, submitForm.ukulele].includes(product.type));

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
                    <input type="number" placeholder="1 000" id="priceMin" value={submitForm.priceMin} name="priceMin" onChange={handleChangeField} />
                  </div>
                  <div className="form-input">
                    <label className="visually-hidden">Максимальная цена</label>
                    <input type="number" placeholder="30 000" id="priceMax" value={submitForm.priceMax} name="priceMax" onChange={handleChangeField} />
                  </div>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Тип гитар</legend>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="acoustic" checked={Boolean(submitForm.acoustic)} value={submitForm.acoustic ? '' : "acoustic"} name="acoustic" onChange={handleChangeField} />
                  <label htmlFor="acoustic">Акустические гитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="electric" checked={Boolean(submitForm.electric)} value={submitForm.electric ? '' : "electric"} name="electric" onChange={handleChangeField} />
                  <label htmlFor="electric">Электрогитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="ukulele" checked={Boolean(submitForm.ukulele)} value={submitForm.ukulele ? '' : "ukulele"} name="ukulele" onChange={handleChangeField} />
                  <label htmlFor="ukulele">Укулеле</label>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Количество струн</legend>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="4-strings" name="fourStrings" />
                  <label htmlFor="fourStrings">4</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="6-strings" name="sixStrings" />
                  <label htmlFor="sixStrings">6</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="7-strings" name="sevenStrings" />
                  <label htmlFor="7-strings">7</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="12-strings" name="twelveStrings" />
                  <label htmlFor="twelveStrings">12</label>
                </div>
              </fieldset>
              <button 
              className="catalog-filter__reset-btn button button--black-border button--medium" 
              type="reset" 
              onClick={() => setChangeForm((prev) => ({...initialForm}))}>Очистить</button>
            </form>
            <div className="catalog-sort">
              <h2 className="catalog-sort__title">Сортировать:</h2>
              <div className="catalog-sort__type">
                <button className="catalog-sort__type-button" aria-label="по цене" onClick={() => handleSort('price')}>по цене</button>
                <button className="catalog-sort__type-button" aria-label="по популярности" onClick={() => handleSort('rating')}>по популярности</button>
              </div>
              <div className="catalog-sort__order">
                <button className={cn("catalog-sort__order-button catalog-sort__order-button--up", { "button__red": sortDirection === 1 })} aria-label="По возрастанию" onClick={() => setSortDirection(1)}></button>
                <button className={cn("catalog-sort__order-button catalog-sort__order-button--down", { "button__red": sortDirection === -1 })} aria-label="По убыванию" onClick={() => setSortDirection(-1)}></button>
              </div>
            </div>
            {
              products.length ? <div className="cards catalog__cards">
                {products.map((product) => <ProductItem key={product.id} product={product} onShowModal={showModal} />)}
              </div> : <h2>По данному запросу ничего не найдено</h2>
            }


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