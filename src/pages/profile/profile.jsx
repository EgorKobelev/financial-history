import React from "react";
import styles from "./profile.module.css";
import { useForm } from "../../hooks/useForm";
import isValidEmail from "../../utils/validEmail";

const initialValues = {
    email: "",
    password: "",
    name: "",
};

const Profile = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const { values, handleChange, setValues } = useForm({ ...initialValues });

    const handleDisable = () => {
        setValues({ ...initialValues });
    };

    return (
        <div className={styles.profile__container}>
            <h2 className={styles.profile__title}>Профиль</h2>
            <div className={styles.profile__avatar_container}>
                <div className={styles.profile__avatar}></div>
                <button className={styles.profile__avatar_button}>Выбрать изображение</button>
            </div>
            <form className={styles.profile__form} onSubmit={handleSubmit}>
                <input
                    className={styles.profile__input}
                    onChange={handleChange}
                    value={values.name}
                    placeholder="Имя"
                    type="text"
                    name="name"
                />
                <input
                    className={styles.profile__input}
                    onChange={handleChange}
                    value={values.email}
                    placeholder="Почта"
                    type="email"
                    name="email"
                />
                <input
                    className={styles.profile__input}
                    onChange={handleChange}
                    value={values.password}
                    placeholder="Введите Пароль"
                    type="password"
                    name="password"
                />
                <div>
                    <button
                        onClick={handleDisable}
                        className={`${styles.profile__button} ${styles.profile__button__exit}`}
                    >
                        Отменить
                    </button>
                    <button
                        className={`${styles.profile__button} ${
                            values.email.length > 0 &&
                            values.name.length > 1 &&
                            isValidEmail(values.email) &&
                            values.password.length > 6
                                ? styles.profile__button_active
                                : null
                        }`}
                        type="submit"
                    >
                        Сохранить
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
