import { useForm } from "../../hooks/useForm";
import styles from "./balance-modal.module.css";

const BalanceModal = ({ balance, handleToggleModal }) => {
    const { values, handleChange } = useForm({
        balance: balance,
    });

    const handleSubmit = () => {
        handleToggleModal();
    };

    return (
        <div className={styles.container}>
            <form>
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
