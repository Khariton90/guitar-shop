import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppRoute, AuthStatus } from "../../consts";
import { useAppSelector } from "../../hooks";
import cn from 'classnames';

type HeaderProps = {
  productsCountToCart: number;
}

function Header({productsCountToCart}: HeaderProps): JSX.Element {
  const navigate = useNavigate();
  const authStatus = useAppSelector(({userReducer}) => userReducer.autorizationStatus);
  const user = useAppSelector(({userReducer}) => userReducer.user);
  const status = authStatus === AuthStatus.Auth && "svg--red";

  return (
    <header className="header" id="header">
        <div className="container">
          <div className="header__wrapper">
            <Link className="header__logo logo" to={AppRoute.Main}>
              <img className="logo__img" width="70" height="70" src="./assets/img/svg/logo.svg" alt="Логотип" />
            </Link>
            <nav className="main-nav">
              <ul className="main-nav__list">
                <li className="main-nav__item" onClick={() => navigate(AppRoute.Main)}>
                  <Link className="link main-nav__link link--current" to={AppRoute.Main}>Каталог</Link>
                </li>
                <li className="main-nav__item" onClick={() => navigate(AppRoute.Main)}>
                  <Link className="link main-nav__link link--current" to={AppRoute.Main}>Гду купить?</Link>
                </li>
                <li className="main-nav__item" onClick={() => navigate(AppRoute.Main)}>
                  <Link className="link main-nav__link link--current" to={AppRoute.Main}>О компании</Link>
                </li>
              </ul>
            </nav>      
            <div className="header__container"><span className="header__user-name">Имя</span>
            <Link className="header__link" to={AppRoute.Login} aria-label="Перейти в личный кабинет">
              <svg className={cn("header__link-icon", status)} width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-account"></use>
              </svg><span className="header__link-text">{user ? user.username : "Вход"}</span></Link>
              <Link className="header__cart-link" to={AppRoute.Cart} aria-label="Перейти в корзину">
                <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-basket"></use>
                </svg></Link> { productsCountToCart ? <span className="header__cart-count">{productsCountToCart}</span> : null }
                </div>
          </div>
        </div>
      </header>
  );
}

export default memo(Header);