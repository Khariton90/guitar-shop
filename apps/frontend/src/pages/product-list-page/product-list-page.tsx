import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CatalogItem } from "../../components/catalog-item/catalog-item";
import { ModalCartDelete } from "../../components/modal-cart-delete/modal-cart-delete";
import { AppRoute } from "../../consts";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deleteProduct, fetchProductsAction } from "../../store/api-actions";
import { ProductDto } from "../../types/product.dto";

export function ProductListPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const {products} = useAppSelector(({dataReducer}) => dataReducer.products);
  const [showDeleteCart, setShowDeleteCart] = useState<ProductDto | null>(null);

  const onShowHideCard = (card: ProductDto | null) => {
    if (!card) {
      setShowDeleteCart((prevValue) => (prevValue = null));
      return;
    }
    setShowDeleteCart((prevValue) => (prevValue = card));
  }

  useEffect(() => {
    dispatch(fetchProductsAction({ type: null, sort: null }));
  }, [dispatch, showDeleteCart])

  const onDeleteItem = (card: ProductDto) => {
    if (card) {
      dispatch(deleteProduct(card.id));
      setShowDeleteCart((prevValue) => (prevValue = null));
    }
  }

  return (
    <>
     {showDeleteCart ? <ModalCartDelete deleteCart={showDeleteCart} onDeleteItem={onDeleteItem} onShowHideCard={onShowHideCard}/> : null} 
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
                <button className="catalog-sort__type-button catalog-sort__type-button--active" aria-label="по цене">по дате</button>
                <button className="catalog-sort__type-button" aria-label="по цене">по цене</button>
                <button className="catalog-sort__type-button" aria-label="по популярности">по популярности</button>
              </div>
              <div className="catalog-sort__order">
                <button className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию"></button>
                <button className="catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active" aria-label="По убыванию"></button>
              </div>
            </div>
            <div className="catalog-cards">
              <ul className="catalog-cards__list">
                {products.map((item) => <CatalogItem
                  key={item.id}
                  cart={item}
                  onShowHideCard={onShowHideCard} />)}
              </ul>
            </div>
          </div>
          <Link className="button product-list__button button--red button--big" to={AppRoute.AddProduct}>Добавить новый товар</Link>
          <div className="pagination product-list__pagination">
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
      </section>
    </main></>
  )
}