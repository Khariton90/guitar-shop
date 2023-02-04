import { NavLink } from "react-router-dom"
import { AppRoute } from "../../consts"

type ModalEnterProps = {
  modal: boolean,
  onShowModal: (value: boolean) => void;
}

export function ModalEnter({modal, onShowModal}: ModalEnterProps): JSX.Element {

  const closeModal = () => {
    onShowModal(false)
  }

  return (
    <div style={{ position: "absolute", width: "550px", height: "500px", marginBottom: "50px" }}>
      <div className="modal is-active modal--enter modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <div className="modal-enter">
              <h2 className="modal-enter__title">Для выполнения данного действия необходимо войти в&nbsp;систему</h2>
              <NavLink className="button button--big modal-enter__link" to={AppRoute.Login}>Войти</NavLink>
              <p className="modal-enter__text">Если у вас ещё нет аккаунта, необходимо <br /> <NavLink to={AppRoute.Register}>Зарегистрироваться</NavLink></p>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={closeModal}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}