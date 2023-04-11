import React from "react";
import styles from "./finance.module.css";
import FinanceCard from "../finance-card/finance-card";

const data = [
    { title: "Баланс", balance: 12300, desc: "* Текущий баланс" },
    { title: "Доход", balance: 7544, desc: "* Доход за месяц" },
    { title: "Расход", balance: 22235, desc: "* Расходы за месяц" },
];

const Finance = () => {
    return (
        <div className={styles.finance__container}>
            <h2 className={styles.finance__title}>Финансы</h2>
            <div className={styles.finance__card_container}>
                {data.map((element, index) => (
                    <FinanceCard key={index} balance={element.balance} title={element.title} desc={element.desc} />
                ))}
            </div>
        </div>
    );
};

export default Finance;
