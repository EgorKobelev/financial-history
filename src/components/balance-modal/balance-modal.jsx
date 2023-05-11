import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import styles from "./balance-modal.module.css";
import { createBalance } from "../../services/actions/operation";

const BalanceModal = ({ balance, handleToggleModal }) => {
    const dispatch = useDispatch();
    const { values, handleChange } = useForm({
        balance: balance,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createBalance(values.balance));
        handleToggleModal();
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <input
                    className={styles.finance_card__input}
                    onChange={handleChange}
                    value={values.balance}
                    placeholder="Введите Баланс"
                    type="text"
                    name="balance"
                />
                <button
                    className={`${styles.finance_card__button} ${
                        typeof /^\d+$/.test(values.balance) && parseInt(values.balance) > 0
                            ? styles.finance_card__button_active
                            : null
                    }`}
                    type="submit"
                >
                    Сохранить
                </button>
            </form>
        </div>
    );
};

export default BalanceModal;
