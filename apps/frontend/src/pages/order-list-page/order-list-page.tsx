
export function OrderListPage(): JSX.Element {
  return (
    <main className="page-content orders__main">
        <section className="orders">
          <div className="container">
            <h1 className="title title--bigger orders__title">Список заказов</h1>
            <ul className="breadcrumbs orders__breadcrumps">
              <li className="breadcrumbs__item"><a className="link" href="./main.html">Каталог</a>
              </li>
              <li className="breadcrumbs__item"><a className="link" href="/"> Заказы</a>
              </li>
            </ul>
            <div className="catalog-sort">
              <h2 className="catalog-sort__title">Сортировать:</h2>
              <div className="catalog-sort__type">
                <button className="catalog-sort__type-button catalog-sort__type-button--active" aria-label="по дате">по дате</button>
                <button className="catalog-sort__type-button" aria-label="по цене">по цене</button>
              </div>
              <div className="catalog-sort__order">
                <button className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию"></button>
                <button className="catalog-sort__order-button catalog-sort__order-button--down" aria-label="По убыванию"></button>
              </div>
            </div>
            <ul className="orders__list">
              <li className="orders__item">
                <h3 className="orders__number">Заказ №00-000-000</h3><span className="orders__items">товаров&nbsp;<b className="orders__items-qty">4</b></span><span className="orders__date">13.09.2022</span><b className="orders__sum">35 000<span className="orders__rouble">₽</span></b>
                <button className="button button--small orders__remove-button" type="button">Удалить</button>
              </li>
              <li className="orders__item">
                <h3 className="orders__number">Заказ №00-000-000</h3><span className="orders__items">товаров&nbsp;<b className="orders__items-qty">4</b></span><span className="orders__date">13.09.2022</span><b className="orders__sum">35 000<span className="orders__rouble">₽</span></b>
                <button className="button button--small orders__remove-button" type="button">Удалить</button>
              </li>
              <li className="orders__item">
                <h3 className="orders__number">Заказ №00-000-000</h3><span className="orders__items">товаров&nbsp;<b className="orders__items-qty">4</b></span><span className="orders__date">13.09.2022</span><b className="orders__sum">35 000<span className="orders__rouble">₽</span></b>
                <button className="button button--small orders__remove-button" type="button">Удалить</button>
              </li>
              <li className="orders__item">
                <h3 className="orders__number">Заказ №00-000-000</h3><span className="orders__items">товаров&nbsp;<b className="orders__items-qty">4</b></span><span className="orders__date">13.09.2022</span><b className="orders__sum">35 000<span className="orders__rouble">₽</span></b>
                <button className="button button--small orders__remove-button" type="button">Удалить</button>
              </li>
              <li className="orders__item">
                <h3 className="orders__number">Заказ №00-000-000</h3><span className="orders__items">товаров&nbsp;<b className="orders__items-qty">4</b></span><span className="orders__date">13.09.2022</span><b className="orders__sum">35 000<span className="orders__rouble">₽</span></b>
                <button className="button button--small orders__remove-button" type="button">Удалить</button>
              </li>
              <li className="orders__item">
                <h3 className="orders__number">Заказ №00-000-000</h3><span className="orders__items">товаров&nbsp;<b className="orders__items-qty">4</b></span><span className="orders__date">13.09.2022</span><b className="orders__sum">35 000<span className="orders__rouble">₽</span></b>
                <button className="button button--small orders__remove-button" type="button">Удалить</button>
              </li>
            </ul>
            <div className="pagination orders__pagination">
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
      </main>
  )
}