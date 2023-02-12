import { SortDirection } from "@guitar-shop/shared-types";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CatalogFilterBlock } from "../../components/catalog-filter-block/catalog-filter-block";
import { CatalogItem } from "../../components/catalog-item/catalog-item";
import { CatalogSortOrder } from "../../components/catalog-sort-order/catalog-sort-order";
import { ModalCartDelete } from "../../components/modal-cart-delete/modal-cart-delete";
import { PageContentPagination } from "../../components/page-content-pagination/page-content-pagination";
import { AppRoute } from "../../consts";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deleteProduct, fetchProductsAction } from "../../store/api-actions";
import { FilterForm } from "../../types/filter-form.type";
import { ProductSort } from "../../types/product-sort.type";
import { ProductDto } from "../../types/product.dto";
import { DEFAULT, isFilteredCard } from "../../utils";
import cn from 'classnames';

export function ProductListPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { products, total } = useAppSelector(({ dataReducer }) => dataReducer.products);
  const [showDeleteCart, setShowDeleteCart] = useState<ProductDto | null>(null);
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

  const [query, setQuery] = useState<ProductSort>({
    price: SortDirection.Desc,
    page: 1,
    rating: SortDirection.Desc,
    date: SortDirection.Desc
  });

  const [sortType, setSortType] = useState<keyof ProductSort & string>('date');

  const handleSort = (value: keyof ProductSort & string) => {
    setSortType((prevType) => (prevType = value));
  }

  const onShowHideCard = (card: ProductDto | null) => {
    if (!card) {
      setShowDeleteCart((prevValue) => (prevValue = null));
      return;
    }
    setShowDeleteCart((prevValue) => (prevValue = card));
  }


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

  const onDeleteItem = (card: ProductDto) => {
    if (card) {
      dispatch(deleteProduct(card.id));
      setShowDeleteCart((prevValue) => (prevValue = null));
    }
  };

  const onSetQuery = (key: keyof ProductSort & string, value: number) => {
    setQuery((prev) => ({ ...prev, [key]: value }))
  }

  useEffect(() => {
    dispatch(fetchProductsAction(query));
  }, [dispatch, showDeleteCart, submitForm, query]);

  const filteredProducts = products.filter((product: ProductDto) => isFilteredCard(product, submitForm));

  return (
    <>
      {showDeleteCart ? <ModalCartDelete
        deleteCart={showDeleteCart}
        onDeleteItem={onDeleteItem}
        onShowHideCard={onShowHideCard} /> : null}
      <main className="page-content">
        <section className="product-list">
          <div className="container">
            <h1 className="product-list__title">Список товаров</h1>
            <ul className="breadcrumbs">
              <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Main}>Каталог</Link>
              </li>
              <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Main}>Товары</Link>
              </li>
            </ul>
            <div className="catalog">
              <form className="catalog-filter" action="#" method="post">
                <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>

                <CatalogFilterBlock onChangeField={onChangeField} submitForm={submitForm} onSetChangeForm={onSetChangeForm} />
              </form>
              <div className="catalog-sort">
                <h2 className="catalog-sort__title">Сортировать:</h2>
                <div className="catalog-sort__type">
                  <button className={cn("catalog-sort__type-button", {"catalog-sort__type-button--active": sortType === 'date'})} aria-label="по цене" onClick={() => handleSort('date')}>по дате</button>
                  <button className={cn("catalog-sort__type-button", {"catalog-sort__type-button--active": sortType === 'price'})} aria-label="по цене" onClick={() => handleSort('price')}>по цене</button>
                  <button className={cn("catalog-sort__type-button", {"catalog-sort__type-button--active": sortType === 'rating'})} aria-label="по популярности"  onClick={() => handleSort('rating')}>по популярности</button>
                </div>
                <CatalogSortOrder type={sortType} onSetQuery={onSetQuery}/>
              </div>
              <div className="catalog-cards">
                <ul className="catalog-cards__list">
                  {filteredProducts.map((item) => <CatalogItem
                    key={item.id}
                    cart={item}
                    onShowHideCard={onShowHideCard} />)}
                </ul>
              </div>
            </div>
            <Link className="button product-list__button button--red button--big" to={AppRoute.AddProduct}>Добавить новый товар</Link>
            <PageContentPagination
              total={total}
              onSetQuery={onSetQuery}
              query={query} />
          </div>
        </section>
      </main></>
  )
}