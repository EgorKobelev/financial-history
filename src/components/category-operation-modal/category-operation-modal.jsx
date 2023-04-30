import React, { FC } from "react";
import styles from "./category-operation-modal.module.css";
import { useForm } from "../../hooks/useForm";

const CategoryOperationModal = ({ image, isCreateNewCategory = false, sum = "", date = "" }) => {
    const { values, handleChange, setValues } = useForm({
        sum: sum,
        date: date,
    });

    const handleDisable = (e) => {
        e.preventDefault();
        setValues({
            sum: sum,
            date: date,
        });
    };

    return (
        <div className={styles.container}>
            <img className={styles.categories_card__image} src={image} alt="Категория" />
            <p className={styles.categories_card__balance}>{`₽ ${values.sum || 0}`}</p>
            <form>
                <input
                    className={styles.categories_card__input}
                    onChange={handleChange}
                    value={values.sum}
                    placeholder="Введите Сумму"
                    type="text"
                    name="sum"
                />
                <input
                    className={styles.categories_card__input}
                    onChange={handleChange}
                    value={values.date}
                    placeholder="Введите Дату"
                    type="date"
                    name="date"
                />
                <div className="flex">
                    <button
                        onClick={handleDisable}
                        className={`${styles.categories_card__button} ${styles.categories_card__button__exit}`}
                    >
                        Отменить
                    </button>
                    <button
                        className={`${styles.categories_card__button} ${
                            /^\d+$/.test(values.sum) && parseInt(values.sum) > 0 && values.date !== ""
                                ? styles.categories_card__button_active
                                : null
                        }`}
                        type="submit"
                    >
                        Сохранить
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CategoryOperationModal;
