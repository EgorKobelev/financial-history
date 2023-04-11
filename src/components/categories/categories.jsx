import React from "react";
import styles from "./categories.module.css";
import CategoriesCard from "../categories-card/categories-card";
import icon from "../../images/categories/circle.svg";

const data = [
    { title: "Продукты" },
    { title: "Развлечения" },
    { title: "Еда вне дома" },
    { title: "Транспорт" },
    { title: "Образование" },
    { title: "Спорт" },
    { title: "Подарки" },
    { title: "Здоровье" },
    { title: "Покупки" },
    { title: "ЖКХ" },
    { title: "Связь" },
];

const Categories = () => {
    return (
        <div className={styles.categories__container}>
            <h2 className={styles.categories__title}>Категории</h2>
            <div className={styles.categories__card_container}>
                {data.map((element, index) => (
                    <CategoriesCard key={index} title={element.title} image={icon} />
                ))}
            </div>
        </div>
    );
};

export default Categories;
