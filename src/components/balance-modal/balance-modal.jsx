import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import styles from "./balance-modal.module.css";
import { createBalance } from "../../services/actions/operation";

const BalanceModal = ({ balance, handleToggleModal }) => {
    const dispatch = useDispatch();
    const { values, handleChange } = useForm({
        balance: String(balance),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createBalance(values.balance));
        handleToggleModal();
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                {values.balance &&
                    /^\d+\.?\d*$/.test(values.balance) &&
                    values.balance.split(".").length > 1 &&
                    values.balance.split(".")[1].length > 2 && <p className={styles.error}>Дробная часть только до сотых.</p>}
                {values.balance && !Number(values.balance) && values.balance !== "0" && <p className={styles.error}>Только числа.</p>}
                {values.balance && Number(values.balance) < 0 && <p className={styles.error}>Только положительные числа.</p>}
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
                        Number(values.balance) >= 0 &&
                        /^\d+\.?\d*$/.test(values.balance) &&
                        ((values.balance.split(".").length > 1 && values.balance.split(".")[1].length <= 2) ||
                            values.balance.split(".").length === 1)
                            ? styles.finance_card__button_active
                            : null
                    }`}
                    disabled={
                        !(
                            Number(values.balance) >= 0 &&
                            /^\d+\.?\d*$/.test(values.balance) &&
                            ((values.balance.split(".").length > 1 && values.balance.split(".")[1].length <= 2) ||
                                values.balance.split(".").length === 1)
                        )
                    }
                    type="submit"
                >
                    Сохранить
                </button>
            </form>
        </div>
    );
};

export default BalanceModal;
