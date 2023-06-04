import React from "react";
import styles from "./login-page.module.css";
import isValidEmail from "../../utils/validEmail";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { login } from "../../services/actions/user";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(values));
    };
    const { values, handleChange } = useForm({
        email: "",
        password: "",
    });
    return (
        <div className={styles.login__container}>
            <h2 className={styles.login__title}>Авторизация</h2>
            <form className={styles.login__form} onSubmit={handleSubmit}>
                <input className={styles.login__input} onChange={handleChange} value={values.email} placeholder="Введите Почту" type="email" name="email" />
                <input
                    className={styles.login__input}
                    onChange={handleChange}
                    value={values.password}
                    placeholder="Введите Пароль"
                    type="password"
                    name="password"
                />
                <button
                    className={`${styles.login__button} ${
                        values.email.length > 0 && isValidEmail(values.email) && values.password.length > 5 ? styles.login__button_active : null
                    }`}
                    type="submit"
                >
                    Войти
                </button>
            </form>
            <div className={styles.login__text_container}>
                <p>Забыли пароль? </p>
                <button onClick={() => navigate("/recover")} className={styles.link}>
                    Восстановить
                </button>
            </div>
            <div className={styles.login__text_container}>
                <p>Нет аккаунта? </p>
                <button onClick={() => navigate("/register")} className={styles.link}>
                    Создать
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
