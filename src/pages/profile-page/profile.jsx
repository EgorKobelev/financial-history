import styles from "./profile.module.css";
import { useForm } from "../../hooks/useForm";
import isValidEmail from "../../utils/valid-email";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { update } from "../../services/actions/user";
import { useRef } from "react";
import { ReactComponent as EditButton } from "../../images/edit.svg";
import $api from "../../http";
import defaultImage from "../../images/avatar.svg";
import { toast } from "react-toastify";

const initialValues = {
    email: "",
    password: "",
    name: "",
    img: "",
};

const getUser = (store) => store.userReducer.user;

const Profile = () => {
    const fileRef = useRef(null);
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const passwordRef = useRef(null);
    const handleSubmit = (e) => {
        const form = {};
        if (values.name !== user.name) {
            form["name"] = values.name;
        }
        if (values.email !== user.email) {
            form["email"] = values.email;
        }
        if (values.password && values.password.length > 6) {
            form["password"] = values.password;
            passwordRef.current.value = "";
            setValues({ ...values, password: "" });
        }
        if (values.img !== user.img) {
            form["img"] = values.img;
        }
        dispatch(update(form));
        let inputs = document.querySelectorAll(".form__input--profile");
        inputs.forEach((input) => {
            input.disabled = true;
            input.classList.remove(`${styles.form__input_active}`);
        });
        e.preventDefault();
    };
    const { values, handleChange, setValues } = useForm({
        ...initialValues,
        name: user.name || "",
        email: user.email || "",
        img: user.img,
    });

    const handleDisable = (e) => {
        setValues({ ...initialValues, name: user.name || "", email: user.email || "", img: user.img || null });
        let inputs = document.querySelectorAll(".form__input--profile");
        inputs.forEach((input) => {
            input.disabled = true;
            input.classList.remove(`${styles.form__input_active}`);
        });
        e.preventDefault();
    };

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            if (event.target.files && event.target.files.length > 0) {
                const file = event.target.files[0];
                formData.append("uploadedImg", file);
                const { data } = await $api.post("/Authorize/addImgInProfile", formData);
                setValues({ ...values, img: data });
            }
        } catch {
            toast.error("Не удалось добавить картинку");
        }
    };
    return (
        <div className={styles.profile__container}>
            <h2 className={styles.profile__title}>Профиль</h2>
            <div className={styles.profile__avatar_container}>
                <img src={values.img || defaultImage} alt="аватар" className={styles.profile__avatar} />
                {values.img && (
                    <button
                        onClick={() => {
                            setValues({ ...values, img: null });
                        }}
                        className={`${styles.profile__avatar_button} ${styles.profile__avatar_button_delete}`}
                    >
                        Удалить
                    </button>
                )}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        fileRef.current?.click();
                    }}
                    className={styles.profile__avatar_button}
                >
                    Выбрать
                </button>
                <input ref={fileRef} accept="image/png, image/jpeg" type="file" onChange={handleChangeFile} hidden />
            </div>
            <form className="form" onSubmit={handleSubmit}>
                {values.name.length <= 1 && values.name.length > 0 && <p className="form__attention">Имя состоит минимум из 2 символов.</p>}
                <div className={styles.input__container}>
                    <input
                        className="form__input form__input--profile"
                        onChange={handleChange}
                        value={values.name}
                        placeholder="Имя"
                        type="text"
                        name="name"
                        disabled={true}
                    />
                    <EditButton
                        onClick={(e) => {
                            const input = e.target.parentElement.children[0];
                            if (input.classList.contains(`${styles.form__input_active}`)) {
                                input.classList.remove(`${styles.form__input_active}`);
                            } else {
                                input.classList.add(`${styles.form__input_active}`);
                            }
                            const disabled = input.disabled;
                            input.disabled = !disabled;
                        }}
                        className={styles.profile__edit_image}
                        alt="Отредактировать"
                    />
                </div>
                {!isValidEmail(values.email) && values.email.length > 0 && <p className="form__attention">Некорректная почта.</p>}
                <div className={styles.input__container}>
                    <input
                        className="form__input form__input--profile"
                        onChange={handleChange}
                        value={values.email}
                        placeholder="Почта"
                        type="email"
                        name="email"
                        disabled={true}
                    />
                    <EditButton
                        onClick={(e) => {
                            const input = e.target.parentElement.children[0];
                            if (input.classList.contains(`${styles.form__input_active}`)) {
                                input.classList.remove(`${styles.form__input_active}`);
                            } else {
                                input.classList.add(`${styles.form__input_active}`);
                            }
                            const disabled = input.disabled;
                            input.disabled = !disabled;
                        }}
                        className={styles.profile__edit_image}
                        alt="Отредактировать"
                    />
                </div>
                {values.password.length < 6 && values.password.length !== 0 && <p className="form__attention">Минимум 6 символов.</p>}
                {!(/^[a-zA-Z0-9.,!?:;"-_]+$/.test(values.password) && /[a-zA-Z]/.test(values.password)) && values.password.length !== 0 && (
                    <p className="form__attention">Должны быть буквы латинского алфавита. Может включать цифры и символы.</p>
                )}
                <div className={styles.input__container}>
                    <input
                        ref={passwordRef}
                        className="form__input form__input--profile"
                        onChange={handleChange}
                        value={values.password}
                        placeholder="Новый Пароль"
                        type="password"
                        name="password"
                        disabled={true}
                    />
                    <EditButton
                        onClick={(e) => {
                            const input = e.target.parentElement.children[0];
                            if (input.classList.contains(`${styles.form__input_active}`)) {
                                input.classList.remove(`${styles.form__input_active}`);
                            } else {
                                input.classList.add(`${styles.form__input_active}`);
                            }
                            const disabled = input.disabled;
                            input.disabled = !disabled;
                        }}
                        className={styles.profile__edit_image}
                        alt="Отредактировать"
                    />
                </div>

                <div>
                    <button type="button" onClick={handleDisable} className={`${styles.profile__button} ${styles.profile__button__exit}`}>
                        Очистить
                    </button>
                    <button
                        className={`${styles.profile__button} ${
                            values.email.length > 0 &&
                            values.name.length > 1 &&
                            isValidEmail(values.email) &&
                            (values.email !== user.email ||
                                (/^[a-zA-Z0-9_]+$/.test(values.password) && /[a-zA-Z]/.test(values.password) && values.password.length >= 6) ||
                                values.name !== user.name ||
                                (values.img !== user.img && (typeof user.img !== "undefined" || values.img)))
                                ? styles.profile__button_active
                                : null
                        }`}
                        disabled={
                            !(
                                values.email.length > 0 &&
                                values.name.length > 1 &&
                                isValidEmail(values.email) &&
                                (values.email !== user.email ||
                                    (/^[a-zA-Z0-9_]+$/.test(values.password) && /[a-zA-Z]/.test(values.password) && values.password.length >= 6) ||
                                    values.name !== user.name ||
                                    (values.img !== user.img && (typeof user.img !== "undefined" || values.img)))
                            )
                        }
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
