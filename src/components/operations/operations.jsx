import React from "react";
import styles from "./operations.module.css";
import deleteImage from "../../images/delete.svg";
import editImage from "../../images/edit.svg";

const data = {
    operation: "Доход",
    transactions: [
        { category: "Продукты", money: 1231 },
        { category: "ЖКХ", money: 4300 },
        { category: "Подарки", money: 2000 },
        { category: "Спорт", money: 5990 },
    ],
};

const Operations = () => {
    return (
        <div className={styles.operations__container}>
            <div className={styles.operations__header}>
                <h3>{data.operation}</h3>
            </div>
            <ul className={styles.operations__list}>
                {data.transactions.map((element, index) => (
                    <li className={styles.operations__list_item} key={index}>
                        <p className={styles.list__text}>{`${element.category} - ${element.money} ₽`}</p>
                        <div className={styles.list__images}>
                            <img className={styles.list__images__first_image} src={deleteImage} alt="Удалить" />
                            <img src={editImage} alt="Отредактировать" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Operations;
