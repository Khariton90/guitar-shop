
export function CartPage(): JSX.Element {
  return (
    <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
            </li>
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Каталог</a>
            </li>
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Корзина</a>
            </li>
          </ul>
          <div className="cart">
            <div className="cart-item">
              <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить"><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
              </button>
              <div className="cart-item__image">
                <img src="img/content/catalog-product-1.png" srcSet="img/content/catalog-product-1@2x.png 2x" width="55" height="130" alt="ЭлектроГитара Честер bass"/>
              </div>
              <div className="product-info cart-item__info">
                <p className="product-info__title">ЭлектроГитара Честер bass</p>
                <p className="product-info__info">Артикул: SO757575</p>
                <p className="product-info__info">Электрогитара, 6 струнная</p>
              </div>
              <div className="cart-item__price">17 500 ₽</div>
              <div className="quantity cart-item__quantity">
                <button className="quantity__button" aria-label="Уменьшить количество">
                  <svg width="8" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-minus"></use>
                  </svg>
                </button>
                <input className="quantity__input" type="number" placeholder="1" id="1-count" name="1-count" max="99"/>
                <button className="quantity__button" aria-label="Увеличить количество">
                  <svg width="8" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-plus"></use>
                  </svg>
                </button>
              </div>
              <div className="cart-item__price-total">17 500 ₽</div>
            </div>
            <div className="cart-item">
              <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить"><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
              </button>
              <div className="cart-item__image">
                <img src="img/content/catalog-product-1.png" srcSet="img/content/catalog-product-1@2x.png 2x" width="55" height="130" alt="СURT Z30 Plus"/>
              </div>
              <div className="product-info cart-item__info">
                <p className="product-info__title">СURT Z30 Plus</p>
                <p className="product-info__info">Артикул: SO754565</p>
                <p className="product-info__info">Электрогитара, 6 струнная</p>
              </div>
              <div className="cart-item__price">34 500 ₽</div>
              <div className="quantity cart-item__quantity">
                <button className="quantity__button" aria-label="Уменьшить количество">
                  <svg width="8" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-minus"></use>
                  </svg>
                </button>
                <input className="quantity__input" type="number" placeholder="1" id="1-count" name="1-count" max="99"/>
                <button className="quantity__button" aria-label="Увеличить количество">
                  <svg width="8" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-plus"></use>
                  </svg>
                </button>
              </div>
              <div className="cart-item__price-total">34 500 ₽</div>
            </div>
            <div className="cart__footer">
              <div className="cart__total-info">
                <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">52 000 ₽</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">52 000 ₽</span></p>
                <button className="button button--red button--big cart__order-button">Оформить заказ</button>
              </div>
            </div>
          </div>
        </div>
      </main>
  )
}