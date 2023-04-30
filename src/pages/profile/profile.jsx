import React from "react";
import styles from "./profile.module.css";
import { useForm } from "../../hooks/useForm";
import isValidEmail from "../../utils/validEmail";
import { useSelector } from "react-redux";
import editImage from "../../images/edit.svg";
import { useDispatch } from "react-redux";
import { update } from "../../services/actions/user";

const initialValues = {
    email: "",
    password: "",
    currentPassword: "",
    name: "",
};

const getUser = (store) => store.userReducer.user;

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const handleSubmit = (e) => {
        dispatch(update(values));

        e.preventDefault();
    };
    const { values, handleChange, setValues } = useForm({
        ...initialValues,
        name: user.name || "",
        email: user.email || "",
    });

    const handleDisable = () => {
        setValues({ ...initialValues, name: user.name || "", email: user.email || "" });
    };

    return (
        <div className={styles.profile__container}>
            <h2 className={styles.profile__title}>Профиль</h2>
            <div className={styles.profile__avatar_container}>
                <div className={styles.profile__avatar}></div>
                <button className={styles.profile__avatar_button}>Выбрать изображение</button>
            </div>
            <form className={styles.profile__form} onSubmit={handleSubmit}>
                <div className={styles.input__container}>
                    <input
                        className={styles.profile__input}
                        onChange={handleChange}
                        value={values.name}
                        placeholder="Имя"
                        type="text"
                        name="name"
                        disabled={true}
                    />
                    <img
                        onClick={(e) => {
                            const input = e.target.parentElement.children[0];
                            const disabled = input.disabled;
                            input.disabled = !disabled;
                        }}
                        className={styles.profile__edit_image}
                        src={editImage}
                        alt="Отредактировать"
                    />
                </div>
                <div className={styles.input__container}>
                    <input
                        className={styles.profile__input}
                        onChange={handleChange}
                        value={values.email}
                        placeholder="Почта"
                        type="email"
                        name="email"
                        disabled={true}
                    />
                    <img
                        onClick={(e) => {
                            const input = e.target.parentElement.children[0];
                            const disabled = input.disabled;
                            input.disabled = !disabled;
                        }}
                        className={styles.profile__edit_image}
                        src={editImage}
                        alt="Отредактировать"
                    />
                </div>
                <div className={styles.input__container}>
                    <input
                        className={styles.profile__input}
                        onChange={handleChange}
                        value={values.currentPassword}
                        placeholder="Старый Пароль"
                        type="password"
                        name="currentPassword"
                        disabled={true}
                    />
                    <img
                        onClick={(e) => {
                            const input = e.target.parentElement.children[0];
                            const disabled = input.disabled;
                            input.disabled = !disabled;
                        }}
                        className={styles.profile__edit_image}
                        src={editImage}
                        alt="Отредактировать"
                    />
                </div>
                <div className={styles.input__container}>
                    <input
                        className={styles.profile__input}
                        onChange={handleChange}
                        value={values.password}
                        placeholder="Новый Пароль"
                        type="password"
                        name="password"
                        disabled={true}
                    />
                    <img
                        onClick={(e) => {
                            const input = e.target.parentElement.children[0];
                            const disabled = input.disabled;
                            input.disabled = !disabled;
                        }}
                        className={styles.profile__edit_image}
                        src={editImage}
                        alt="Отредактировать"
                    />
                </div>

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
