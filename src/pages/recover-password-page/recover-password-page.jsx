import isValidEmail from "../../utils/valid-email";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import $api from "../../http";
import { toast } from "react-toastify";

const RecoverPasswordPage = () => {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            $api.patch("Authorize/recoverPassword", values);
            toast.success("Уведомление отправлено вам на почту", { autoClose: 3000 });
        } catch (e) {
            toast.error("Не удалось отправить письмо для восстановления", { autoClose: 3000 });
        }
    };
    const { values, handleChange } = useForm({
        email: "",
    });
    return (
        <div className="form__container">
            <h2 className="form__title">Восстановление</h2>
            <form className="form" onSubmit={handleSubmit}>
                <input className="form__input" onChange={handleChange} value={values.email} placeholder="Введите Почту" type="email" name="email" />
                <button
                    disabled={!isValidEmail(values.email)}
                    className={`form__button ${isValidEmail(values.email) ? "form__button_active" : null}`}
                    type="submit"
                >
                    Восстановить
                </button>
            </form>
            <div className="form__text_container">
                <p>Вспомнили пароль? </p>
                <button onClick={() => navigate("/login")} className="form__link">
                    Войти
                </button>
            </div>
        </div>
    );
};

export default RecoverPasswordPage;
