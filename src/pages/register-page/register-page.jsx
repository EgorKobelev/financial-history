import isValidEmail from "../../utils/valid-email";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../services/actions/user";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(register({ email: values.email, password: values.password, name: values.name }));
  };
  const handleLogin = () => {
    navigate("/login");
  };

  const { values, handleChange } = useForm({
    email: "",
    password: "",
    repeatPassword: "",
    name: "",
  });
  return (
    <div className="form__container">
      <h2 className="form__title">Регистрация</h2>
      <form className="form" onSubmit={handleSubmit}>
        {values.name.length <= 1 && values.name.length > 0 && <p className="form__attention">Имя состоит минимум из 2 символов.</p>}
        {values.name && values.name.length > 30 && <p className="form__attention">Максимум 30 символов.</p>}
        {values.name && !(/^[a-zA-Zа-яА-ЯёЁ0-9-]+$/.test(values.name) && /[a-zA-Zа-яА-ЯёЁ]/.test(values.name)) && (
          <p className="form__attention">Должен содержать буквы. Может включать цифры и тире.</p>
        )}
        <input
          data-test-id="name"
          className="form__input"
          onChange={handleChange}
          value={values.name}
          placeholder="Введите Имя"
          type="text"
          name="name"
        />
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
          data-test-id="password"
          className="form__input"
          onChange={handleChange}
          value={values.password}
          placeholder="Введите Пароль"
          type="password"
          name="password"
        />
        {values.password.length > 0 && values.repeatPassword.length > 0 && values.password !== values.repeatPassword && (
          <p className="form__attention">Пароли не совпадают.</p>
        )}
        <input
          data-test-id="repeatPassword"
          className="form__input"
          onChange={handleChange}
          value={values.repeatPassword}
          placeholder="Потворите Пароль"
          type="password"
          name="repeatPassword"
        />
        <button
          data-test-id="repeatPassword"
          className={`form__button ${
            values.email.length > 0 &&
            isValidEmail(values.email) &&
            values.name.length > 1 &&
            /^[a-zA-Zа-яА-ЯёЁ0-9-]+$/.test(values.name) &&
            /[a-zA-Zа-яА-ЯёЁ]/.test(values.name) &&
            /^[a-zA-Z0-9.,!?:;"-_]+$/.test(values.password) &&
            /[a-zA-Z]/.test(values.password) &&
            values.password.length >= 6 &&
            values.name.length <= 30 &&
            values.password === values.repeatPassword
              ? "form__button_active"
              : null
          }`}
          disabled={
            !(
              values.email.length > 0 &&
              /^[a-zA-Zа-яА-ЯёЁ0-9-]+$/.test(values.name) &&
              /[a-zA-Zа-яА-ЯёЁ]/.test(values.name) &&
              isValidEmail(values.email) &&
              /^[a-zA-Z0-9.,!?:;"-_]+$/.test(values.password) &&
              /[a-zA-Z]/.test(values.password) &&
              values.password.length >= 6 &&
              values.name.length > 1 &&
              values.name.length <= 30 &&
              values.password === values.repeatPassword
            )
          }
          type="submit"
        >
          Регистрация
        </button>
      </form>
      <div className="form__text_container">
        <p>Зарегистрированы?</p>
        <button onClick={handleLogin} className="form__link">
          Войти
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
