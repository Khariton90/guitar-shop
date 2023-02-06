import { ProductDto } from "../../types/product.dto"

type CartItemProps = {
  product: ProductDto
}

export function CartItem({product}: CartItemProps): JSX.Element {
  return (
    <div className="cart-item">
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить"><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image">
        <img src={product.image} srcSet={product.image} width="55" height="130" alt="ЭлектроГитара Честер bass" />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{ product.title }</p>
        <p className="product-info__info">{ product.article }</p>
        <p className="product-info__info">Гитара { product.strings } струнная</p>
      </div>
      <div className="cart-item__price">17 500 ₽</div>
      <div className="quantity cart-item__quantity">
        <button className="quantity__button" aria-label="Уменьшить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input className="quantity__input" type="number" placeholder="1" id="1-count" name="1-count" max="99" />
        <button className="quantity__button" aria-label="Увеличить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">17 500 ₽</div>
    </div>
  )
}