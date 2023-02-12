import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ModalEnter } from "../../components/modal-enter/modal-enter";
import { ProductItem } from "../../components/product-item/product-item";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchProductsAction } from "../../store/api-actions";
import { DEFAULT, isFilteredCard, Price } from "../../utils";
import { SortDirection } from "@guitar-shop/shared-types";
import { ProductDto } from "../../types/product.dto";
import { ProductSort } from "../../types/product-sort.type";
import { CatalogSortOrder } from "../../components/catalog-sort-order/catalog-sort-order";
import { CatalogFilterBlock } from "../../components/catalog-filter-block/catalog-filter-block";
import { FilterForm } from "../../types/filter-form.type";
import { PageContentPagination } from "../../components/page-content-pagination/page-content-pagination";

export function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { products, total } = useAppSelector(({ dataReducer }) => dataReducer.products);
  const [modal, setModal] = useState(false);
  const [submitForm, setChangeForm] = useState<FilterForm>({
    priceMin: DEFAULT,
    priceMax: DEFAULT,
    acoustic: DEFAULT,
    electric: DEFAULT,
    ukulele: DEFAULT,
    fourStrings: DEFAULT,
    sixStrings: DEFAULT,
    sevenStrings: DEFAULT,
    twelveStrings: DEFAULT,
  });

  const [sortType, setSortType] = useState<keyof ProductSort & string>('date');
  const [query, setQuery] = useState<ProductSort>({
    price: SortDirection.Desc,
    page: 1,
    rating: SortDirection.Desc,
    date: SortDirection.Desc
  });

  const handleSubmit = (evt: FormEvent<HTMLFormElement | HTMLInputElement>) => {
    evt.preventDefault();
  }

  const handleSort = (value: keyof ProductSort & string) => {
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

  const handleChangePrice = (evt: ChangeEvent<HTMLInputElement>) => {
    setChangeForm((prevForm) => ({
      ...prevForm,
      [evt.target.name]: evt.target.value ? evt.target.value : DEFAULT,
    }));
  };

  const onChangeField = (evt: ChangeEvent<HTMLInputElement>) => {
    setChangeForm((prevForm) => ({
      ...prevForm,
      [evt.target.name]: evt.target.checked ? evt.target.value : DEFAULT,
    }));
  };

  const onSetChangeForm = (form: FilterForm) => {
    setChangeForm((prevForm) => ({
      ...prevForm,
      ...form
    }));
  };

  const onSetQuery = (key: keyof ProductSort & string, value: number) => {
    setQuery((prev) => ({ ...prev, [key]: value }))
  }

  useEffect(() => {
    dispatch(fetchProductsAction(query));

    if (modal) {
      document.body.addEventListener('keydown', keyPressCloseModal);
      document.body.style.overflow = 'hidden';
    }

    return function cleanup() {
      document.body.removeEventListener('keydown', keyPressCloseModal);
      document.body.style.overflow = '';
    }
  }, [dispatch, keyPressCloseModal, modal, query, submitForm])

  const filteredProducts = products.filter((product: ProductDto) => isFilteredCard(product, submitForm));

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
              <CatalogFilterBlock
                onSetChangeForm={onSetChangeForm}
                onChangeField={onChangeField}
                submitForm={submitForm} />
            </form>
            <div className="catalog-sort">
              <h2 className="catalog-sort__title">Сортировать:</h2>
              <div className="catalog-sort__type">
                <button className="catalog-sort__type-button" aria-label="по цене" onClick={() => handleSort('price')}>по цене</button>
                <button className="catalog-sort__type-button" aria-label="по популярности" onClick={() => handleSort('rating')}>по популярности</button>
              </div>
              <CatalogSortOrder type={sortType} onSetQuery={onSetQuery} />
            </div>
            {
              filteredProducts.length ?
                <div className="cards catalog__cards">
                  {filteredProducts.map((product) => <ProductItem key={product.id} product={product} onShowModal={showModal} />)}
                </div> :
                <h2>По данному запросу ничего не найдено</h2>
            }
            <PageContentPagination total={total} onSetQuery={onSetQuery} query={query} />
          </div>
        </div>
      </main>
    </>
  )
}