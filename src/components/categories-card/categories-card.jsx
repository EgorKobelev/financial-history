import React from "react";
import styles from "./categories-card.module.css";

const CategoriesCard = ({ title, image }) => {
    return (
        <div className={styles.categories_card__container}>
            <h3 className={styles.categories_card__title}>{title}</h3>
            <img className={styles.categories_card__image} src={image} alt="Категория" />
            <p className={styles.categories_card__balance}>{`₽ ${0}`}</p>
        </div>
    );
};

export default CategoriesCard;
