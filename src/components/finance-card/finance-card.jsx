import React from "react";
import styles from "./finance-card.module.css";

const FinanceCard = ({ title, balance, desc }) => {
    return (
        <div>
            <div className={styles.card__container}>
                <h3 className={styles.card__title}>{title}</h3>
                <p className={styles.card__balance}>{`₽ ${balance}`}</p>
            </div>
            <p className={styles.card__desc}>{desc}</p>
        </div>
    );
};

export default FinanceCard;
