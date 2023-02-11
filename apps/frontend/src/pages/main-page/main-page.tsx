import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ModalEnter } from "../../components/modal-enter/modal-enter";
import { ProductItem } from "../../components/product-item/product-item";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchProductsAction } from "../../store/api-actions";
import { DEFAULT, isFilteredCard, Price } from "../../utils";
import cn from 'classnames';
import { StringEnum } from "@guitar-shop/shared-types";
import { ProductDto } from "../../types/product.dto";
import { PAGINATION_BUTTON_COUNT } from "../../consts";

const initialForm = {
  priceMin: DEFAULT, 
  priceMax: DEFAULT,
  acoustic: DEFAULT,
  electric: DEFAULT,
  ukulele: DEFAULT,
  fourStrings: DEFAULT,
  sixStrings: DEFAULT,
  sevenStrings: DEFAULT,
  twelveStrings: DEFAULT,
};

export function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { products, total } = useAppSelector(({ dataReducer }) => dataReducer.products);
  const [modal, setModal] = useState(false);
  const [submitForm, setChangeForm] = useState(initialForm);
  
  const handleChangeField = (evt: ChangeEvent<HTMLInputElement>) => {
    setChangeForm((prevForm) => ({
      ...prevForm,
      [evt.target.name]: evt.target.checked ? evt.target.value : 'DEFAULT',
    }));
  };

  const handleChangePrice = (evt: ChangeEvent<HTMLInputElement>) => {
     setChangeForm((prevForm) => ({
      ...prevForm,
      [evt.target.name]: evt.target.value ? evt.target.value : 'DEFAULT',
    }));
  };

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

  const filteredProducts = products.filter((product: ProductDto) => isFilteredCard(product, submitForm))

  const arrayOfDigits = Array.from({length: PAGINATION_BUTTON_COUNT}, (_, i) => i + 1)

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
                    <input type="number" placeholder={Price.Min.toString()} id="priceMin" 
                    defaultValue={''} min={Price.Min} name="priceMin" onChange={handleChangePrice} />
                  </div>
                  <div className="form-input">
                    <label className="visually-hidden">Максимальная цена</label>
                    <input type="number" max={Price.Max} placeholder={Price.Max.toString()} id="priceMax"
                     defaultValue={""} name="priceMax" onChange={handleChangePrice} />
                  </div>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Тип гитар</legend>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="acoustic" value={"acoustic"} name="acoustic" onChange={handleChangeField} />
                  <label htmlFor="acoustic">Акустические гитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="electric" value={"electric"} name="electric" onChange={handleChangeField} />
                  <label htmlFor="electric">Электрогитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="ukulele" value={"ukulele"} name="ukulele" onChange={handleChangeField} />
                  <label htmlFor="ukulele">Укулеле</label>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Количество струн</legend>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="4-strings" 
                  defaultValue={StringEnum.Four}
                  name="fourStrings" onChange={handleChangeField}/>
                  <label htmlFor="4-strings">4</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="6-strings" 
                  defaultValue={StringEnum.Six}
                  name="sixStrings" onChange={handleChangeField}/>
                  <label htmlFor="6-strings">6</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="7-strings" 
                  defaultValue={StringEnum.Seven}
                  name="sevenStrings" onChange={handleChangeField}/>
                  <label htmlFor="7-strings">7</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="12-strings" 
                  defaultValue={StringEnum.Twelve}
                  name="twelveStrings" onChange={handleChangeField}/>
                  <label htmlFor="12-strings">12</label>
                </div>
              </fieldset>
              <button
                className="catalog-filter__reset-btn button button--black-border button--medium"
                type="reset"
                onClick={() => setChangeForm((prev) => ({ ...initialForm }))}>Очистить</button>
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
              products.length ?
                <div className="cards catalog__cards">
                  {filteredProducts.map((product) => <ProductItem key={product.id} product={product} onShowModal={showModal} />)}
                </div> :
                <h2>По данному запросу ничего не найдено</h2>
            }
            <div className="pagination page-content__pagination">
              <ul className="pagination__list">
                {
                  arrayOfDigits
                  .map((el) => 
                  <li key={el} className="pagination__page pagination__page--active"><a className="link pagination__page-link" href="1">{el}</a></li>)
                }
                <li className="pagination__page pagination__page--next" id="next"><a className="link pagination__page-link" href="2">Далее</a></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}