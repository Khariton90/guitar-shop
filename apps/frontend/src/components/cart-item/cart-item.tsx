import { useAppDispatch } from "../../hooks";
import { decrementQty, incrementQty } from "../../store/action";
import { ProductDto } from "../../types/product.dto"
import { priceFormat } from "../../utils";


type CartItemProps = {
  product: ProductDto,
  qty: number;
  onRemoveFromCart: (id: string) => void;
}

export function CartItem({product, qty, onRemoveFromCart}: CartItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="cart-item">
      <button 
        className="cart-item__close-button button-cross" type="button" 
        aria-label="Удалить"  onClick={() => onRemoveFromCart(product.id)}>
        <span className="button-cross__icon"></span>
        <span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image">
        <img src={product.image} srcSet={product.image} width="55" height="130" alt="ЭлектроГитара Честер bass" />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{ product.title }</p>
        <p className="product-info__info">{ product.article }</p>
        <p className="product-info__info">Гитара { product.strings } струнная</p>
      </div>
      <div className="cart-item__price">{priceFormat(product.price)}</div>
      <div className="quantity cart-item__quantity">
        <button className="quantity__button" aria-label="Уменьшить количество" onClick={() => dispatch(decrementQty(product.id))}>
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input className="quantity__input" type="number" placeholder="1" id="1-count" name="1-count" max="99" value={qty} readOnly/>
        <button className="quantity__button" aria-label="Увеличить количество" onClick={() => dispatch(incrementQty(product.id))}>
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{priceFormat(product.price)}</div>
    </div>
  )
}