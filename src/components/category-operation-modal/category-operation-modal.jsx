import React from "react";
import styles from "./category-operation-modal.module.css";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { createOperation, updateOperation } from "../../services/actions/operation";

const getExpenses = (store) => store.categoryReducer.expenses;

const CategoryOperationModal = ({
    image,
    handleToggleModal,
    categoryId,
    isCreateNewOperation = true,
    sum = "",
    date = "",
    id,
}) => {
    console.log(categoryId);
    const dispatch = useDispatch();
    const expenses = useSelector(getExpenses);
    const { values, handleChange, setValues } = useForm({
        sum: sum,
        date: date,
    });
    const oldPrice = sum;

    const handleDisable = (e) => {
        e.preventDefault();
        setValues({
            sum: sum,
            date: date,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const formattedDate = values.date.split("-");
        if (isCreateNewOperation) {
            const form = {
                dateTime: new Date(formattedDate[0], formattedDate[1] - 1, formattedDate[2]).toISOString(),
                price: values.sum,
                categoryId: categoryId,
            };
            dispatch(createOperation(form));
        } else {
            console.log(categoryId);
            console.log(expenses.find((category) => category.id === categoryId));
            const form = {
                dateTime: new Date(formattedDate[0], formattedDate[1] - 1, formattedDate[2]).toISOString(),
                price: values.sum,
                oldPrice: oldPrice,
                id: id,
            };
            dispatch(updateOperation(form));
        }
        handleToggleModal();
    };

    return (
        <div className={styles.container}>
            <img className={styles.categories_card__image} src={image} alt="Категория" />
            <p className={styles.categories_card__balance}>{`₽ ${values.sum || 0}`}</p>
            <form onSubmit={onSubmit}>
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
