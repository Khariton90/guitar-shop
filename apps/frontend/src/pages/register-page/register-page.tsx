import { ChangeEvent, FormEvent, useState } from "react"
import { useAppDispatch } from "../../hooks";
import { registerUserAction } from "../../store/api-actions";
import { RegisterData } from "../../types/auth-data";

export function RegisterPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const [submitForm, setSubmitForm] = useState<RegisterData>({
    username: '',
    email: '',
    password: ''
  });

  const handleChangeField = (evt: ChangeEvent<HTMLInputElement>) => {
    setSubmitForm((prevForm) => ({
      ...prevForm,
      [evt.target.name]: evt.target.value
    }));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(registerUserAction(submitForm));
  };

  return (
    <main className="page-content">
      <div className="container">
        <section className="login">
          <h1 className="login__title">Регистрация</h1>
          <form method="post" action="/" onSubmit={handleSubmit}>
            <div className="input-login">
              <label htmlFor="name">Введите имя</label>
              <input type="text" id="name" name="username" autoComplete="off" 
              required 
              minLength={1} 
              maxLength={15} onChange={handleChangeField}
              />
              <p className="input-login__error">Заполните поле</p>
            </div>
            <div className="input-login">
              <label htmlFor="email">Введите e-mail</label>
              <input type="email" id="email" name="email" autoComplete="off" required  onChange={handleChangeField}/>
              <p className="input-login__error">Заполните поле</p>
            </div>
            <div className="input-login">
              <label htmlFor="password">Придумайте пароль</label><span>
                <input type="password" placeholder="• • • • • • • • • • • •" id="password" name="password" autoComplete="off" 
                required 
                minLength={6} 
                maxLength={12} onChange={handleChangeField}/>
                <button className="input-login__button-eye" type="button">
                  <svg width="14" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-eye"></use>
                  </svg>
                </button></span>
              <p className="input-login__error">Заполните поле</p>
            </div>
            <button className="button login__button button--medium" type="submit">Зарегистрироваться</button>
          </form>
        </section>
      </div>
    </main>
  )
}