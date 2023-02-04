import { ChangeEvent, FormEvent, useState } from "react"
import { NavLink } from "react-router-dom";
import { AppRoute } from "../../consts";
import { useAppDispatch } from "../../hooks";
import { loginAction } from "../../store/api-actions";

export function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const [submitForm, setSubmitForm] = useState({
    email: '',
    password: ''
  });

  const handleChangeInputValue = (evt: ChangeEvent<HTMLInputElement>) => {
    setSubmitForm((prevForm) => ({
      ...prevForm,
      [evt.target.name]: evt.target.value
    }));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(loginAction(submitForm));
  };

  

  return (
    <main className="page-content">
      <div className="container">
        <section className="login">
          <h1 className="login__title">Войти</h1>
          <p className="login__text">Hовый пользователь? <NavLink className="login__link" to={AppRoute.Register}>Зарегистрируйтесь</NavLink> прямо сейчас</p>
          <form method="post" action="/" onSubmit={handleSubmit}>
            <div className="input-login">
              <label htmlFor="email">Введите e-mail</label>
              <input type="email" id="email" name="email" autoComplete="off" required onChange={handleChangeInputValue}/>
              <p className="input-login__error">Заполните поле</p>
            </div>
            <div className="input-login">
              <label htmlFor="passwordLogin">Введите пароль</label><span>
                <input type="password" placeholder="• • • • • • • • • • • •" 
                id="passwordLogin" 
                name="password" 
                autoComplete="off" 
                required 
                minLength={6}
                maxLength={12}
                onChange={handleChangeInputValue}
                />
                <button className="input-login__button-eye" type="button">
                  <svg width="14" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-eye"></use>
                  </svg>
                </button></span>
              <p className="input-login__error">Заполните поле</p>
            </div>
            <button className="button login__button button--medium" type="submit">Войти</button>
          </form>
        </section>
      </div>
    </main>
  )
}