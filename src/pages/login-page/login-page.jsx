import isValidEmail from "../../utils/valid-email";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { login } from "../../services/actions/user";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login(values));
  };
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });
  return (
    <div className="form__container">
      <h2 className="form__title">Авторизация</h2>
      <form className="form" onSubmit={handleSubmit}>
        {!isValidEmail(values.email) && values.email.length > 0 && <p className="form__attention">Некорректная почта.</p>}
        <input
          data-test-id="email"
          className="form__input"
          onChange={handleChange}
          value={values.email}
          placeholder="Введите Почту"
          type="email"
          name="email"
        />
        {values.password.length < 6 && values.password.length !== 0 && <p className="form__attention">Минимум 6 символов.</p>}
        {!(/^[a-zA-Z0-9.,!?:;"-_]+$/.test(values.password) && /[a-zA-Z]/.test(values.password)) && values.password.length !== 0 && (
          <p className="form__attention">Должны быть буквы латинского алфавита. Может включать цифры и символы.</p>
        )}
        <input
          className="form__input"
          onChange={handleChange}
          value={values.password}
          placeholder="Введите Пароль"
          type="password"
          name="password"
          data-test-id="password"
        />
        <button
          className={`form__button ${
            values.email.length > 0 &&
            isValidEmail(values.email) &&
            /^[a-zA-Z0-9.,!?:;"-_]+$/.test(values.password) &&
            /[a-zA-Z]/.test(values.password) &&
            values.password.length >= 6
              ? "form__button_active"
              : null
          }`}
          disabled={
            !(
              values.email.length > 0 &&
              isValidEmail(values.email) &&
              /^[a-zA-Z0-9.,!?:;"-_]+$/.test(values.password) &&
              /[a-zA-Z]/.test(values.password) &&
              values.password.length >= 6
            )
          }
          type="submit"
        >
          Войти
        </button>
      </form>
      <div className="form__text_container">
        <p>Забыли пароль? </p>
        <button onClick={() => navigate("/recover")} className="form__link">
          Восстановить
        </button>
      </div>
      <div className="form__text_container">
        <p>Нет аккаунта? </p>
        <button data-test-id="login-button" onClick={() => navigate("/register")} className="form__link">
          Создать
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
