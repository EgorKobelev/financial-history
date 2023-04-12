import React from "react";
import styles from "./register-page.module.css";
import isValidEmail from "../../utils/validEmail";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import {register} from "../../services/actions/user";

const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register({email: values.email, password: values.password, name: values.name }))

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
        <div className={styles.register__container}>
            <h2 className={styles.register__title}>Регистрация</h2>
            <form className={styles.register__form} onSubmit={handleSubmit}>
                <input
                    className={styles.register__input}
                    onChange={handleChange}
                    value={values.name}
                    placeholder="Введите Имя"
                    type="text"
                    name="name"
                />
                <input
                    className={styles.register__input}
                    onChange={handleChange}
                    value={values.email}
                    placeholder="Введите Почту"
                    type="email"
                    name="email"
                />
                <input
                    className={styles.register__input}
                    onChange={handleChange}
                    value={values.password}
                    placeholder="Введите Пароль"
                    type="password"
                    name="password"
                />
                <input
                    className={styles.register__input}
                    onChange={handleChange}
                    value={values.repeatPassword}
                    placeholder="Потворите Пароль"
                    type="password"
                    name="repeatPassword"
                />
                <button
                    className={`${styles.register__button} ${
                        values.email.length > 0 &&
                        isValidEmail(values.email) &&
                        values.password.length > 6 &&
                        values.name.length > 1 &&
                        values.password === values.repeatPassword
                            ? styles.register__button_active
                            : null
                    }`}
                    type="submit"
                >
                    Регистрация
                </button>
            </form>
            <div className={styles.register__text_cocntainer}>
                <p>Уже зарегистрированы?</p>
                <button onClick={handleLogin} className={styles.register__link}>
                    Войти
                </button>
            </div>
        </div>
    );
};

export default RegisterPage;
