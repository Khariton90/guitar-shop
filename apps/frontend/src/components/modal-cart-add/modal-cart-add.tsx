import { ProductDto } from "../../types/product.dto";
import { priceFormat } from "../../utils";

type ModalCartAddProps = {
  onChangeConfirm: (value: boolean) => void;
  onAddToCart: () => void;
  product: ProductDto
}

export function ModalCartAdd({ onChangeConfirm, onAddToCart, product }: ModalCartAddProps): JSX.Element {
  const handleClickAddToCart = () => {
    onAddToCart();
    onChangeConfirm(false);
  }

  return (
    <div className="modal is-active modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal onClick={() => onChangeConfirm(false)}></div>
        <div className="modal__content">
          <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
          <div className="modal__info">
            <img className="modal__img" src={product.image}
              srcSet={product.image} width="67" height="137" alt="Честер bass" />
            <div className="modal__info-wrapper">
              <h3 className="modal__product-name title title--little title--uppercase">{product.title}</h3>
              <p className="modal__product-params modal__product-params--margin-11">Артикул: {product.article}</p>
              <p className="modal__product-params">Электрогитара, {product.strings} струнная</p>
              <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{priceFormat(product.price)}</span></p>
            </div>
          </div>
          <div className="modal__button-container">
            <button className="button button--red button--big modal__button modal__button--add" onClick={handleClickAddToCart}>Добавить в корзину</button>
          </div>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={() => onChangeConfirm(false)}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  )
}