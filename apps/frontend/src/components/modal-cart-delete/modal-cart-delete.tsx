import { useNavigate } from "react-router-dom"
import { AppRoute } from "../../consts"
import { ProductDto } from "../../types/product.dto"
import { priceFormat } from "../../utils"

type ModalCartDeleteProps = {
  deleteCart: ProductDto | null,
  onShowHideCard: (value: ProductDto | null) => void,
  onDeleteItem: (card: ProductDto) => void
}

export function ModalCartDelete({deleteCart, onDeleteItem, onShowHideCard}: ModalCartDeleteProps): JSX.Element {
  const navigate = useNavigate();

  const handleNavigate = () => {
    onShowHideCard(null);
    navigate(AppRoute.Main);
  }

  const handleDelete = () => {
    if (deleteCart) {
      onDeleteItem(deleteCart);
    }
  }

  if (deleteCart) {
    return (
      <div>
        <div className="modal is-active modal-for-ui-kit">
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal></div>
            <div className="modal__content">
              <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
              <div className="modal__info">
                <img className="modal__img" 
                  src={deleteCart.image} 
                  srcSet="img/content/catalog-product-1@2x.png 2x" width="67" height="137" alt="Честер bass" />
                <div className="modal__info-wrapper">
                  <h3 className="modal__product-name title title--little title--uppercase">{deleteCart.title}</h3>
                  <p className="modal__product-params modal__product-params--margin-11">Артикул: {deleteCart.article}</p>
                  <p className="modal__product-params">Электрогитара, {deleteCart.strings} струнная</p>
                  <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{priceFormat(deleteCart.price)}</span></p>
                </div>
              </div>
              <div className="modal__button-container">
                <button className="button button--small modal__button" onClick={handleDelete}>Удалить товар</button>
                <button className="button button--black-border button--small modal__button modal__button--right" onClick={handleNavigate}>Продолжить покупки</button>
              </div>
              <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={() => onShowHideCard(null)}>
                <span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <>
  </>
}