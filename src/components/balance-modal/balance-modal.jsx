import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import styles from "./balance-modal.module.css";
import { createBalance } from "../../services/actions/operation";

const BalanceModal = ({ balance, handleToggleModal }) => {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({
    balance: String(balance),
  });

  const handleSubmit = e => {
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
        {values.balance && Number(values.balance) < 0 && <p className={styles.error}>Только положительные числа.</p>}
        {((values.balance && !Number(values.balance) && values.balance !== "0") ||
          (values.balance && !/^[0-9 -]+$/.test(values.balance[0])) ||
          (values.balance && String(Number(values.balance)).length !== values.balance.length)) &&
          values.balance.lenght <= 15 && <p className={styles.error}>Только числа.</p>}
        {values.balance && values.balance.length > 15 && <p className={styles.error}>Максимум 15 символов.</p>}
        <input
          className={styles.finance_card__input}
          onChange={handleChange}
          value={values.balance}
          placeholder="Введите Баланс"
          type="text"
          name="balance"
        />
        <button
          data-test-id="balance-modal"
          className={`${styles.finance_card__button} ${
            Number(values.balance) >= 0 &&
            /^\d+\.?\d*$/.test(values.balance) &&
            String(Number(values.balance)).length === values.balance.length &&
            values.balance.length <= 15 &&
            ((values.balance.split(".").length > 1 && values.balance.split(".")[1].length <= 2) || values.balance.split(".").length === 1)
              ? styles.finance_card__button_active
              : null
          }`}
          disabled={
            !(
              Number(values.balance) >= 0 &&
              values.balance.length <= 15 &&
              String(Number(values.balance)).length === values.balance.length &&
              /^\d+\.?\d*$/.test(values.balance) &&
              ((values.balance.split(".").length > 1 && values.balance.split(".")[1].length <= 2) || values.balance.split(".").length === 1)
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
