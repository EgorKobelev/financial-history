import React, { FC } from "react";
import styles from "./category-operation-modal.module.css";
import { useForm } from "../../hooks/useForm";

const initialValues = {
    sum: "",
    date: "",
};

const CategoryOperationModal = ({ image }) => {
    const { values, handleChange, setValues } = useForm({
        ...initialValues,
    });

    const handleDisable = (e) => {
        e.preventDefault();
        setValues({ ...initialValues });
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
                    placeholder="Введите Сумму"
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
                            values.sum !== "" && values.date !== "" ? styles.categories_card__button_active : null
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
