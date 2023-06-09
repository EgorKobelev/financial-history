import React from "react";
import styles from "./finance.module.css";
import FinanceCard from "../finance-card/finance-card";
import { useSelector } from "react-redux";

const getSum = (store) => store.operationReducer.sum;

const Finance = () => {
    const sum = useSelector(getSum);

    const data = [
        { title: "Баланс", balance: sum.balance, desc: "* Текущий баланс" },
        { title: "Доход", balance: sum.income, desc: "* Доход за месяц" },
        { title: "Расход", balance: sum.expenses, desc: "* Расходы за месяц" },
    ];

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
