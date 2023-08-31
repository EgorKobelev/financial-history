import React from "react";
import styles from "./finance-card.module.css";
import Modal from "../modal/modal";
import BalanceModal from "../balance-modal/balance-modal";
import ToolTip from "../tooltip/tooltip";

const FinanceCard = ({ title, balance, desc }) => {
  const [activeInput, setActiveUnput] = React.useState(false);

  const handleToggleModal = () => {
    setActiveUnput(!activeInput);
  };
  return (
    <div>
      <div
        data-test-id={title === "Баланс" ? "balance" : "finance-card"}
        onClick={title === "Баланс" ? handleToggleModal : null}
        className={`${styles.card__container} ${title === "Баланс" ? styles.card__container_active : null}`}
      >
        <h3 className={styles.card__title}>{title}</h3>

        <ToolTip tooltip={`${balance}`.length >= 12 ? `₽ ${balance}` : null}>
          <p
            data-test-id={title === "Баланс" ? "balance-value" : "finance-card-value"}
            className={styles.card__balance}
          >{`₽ ${balance}`}</p>
        </ToolTip>
      </div>
      <p className={styles.card__desc}>{desc}</p>
      {activeInput && (
        <Modal handleToggleModal={handleToggleModal} title="Введите текущий баланс">
          <BalanceModal handleToggleModal={handleToggleModal} balance={balance} />
        </Modal>
      )}
    </div>
  );
};

export default FinanceCard;
