import styles from "./category-operation-modal.module.css";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { createOperation, updateOperation } from "../../services/actions/operation";

const getBalance = (store) => store.operationReducer.sum.balance;
const getExpenses = (store) => store.categoryReducer.expenses;
const getIncome = (store) => store.categoryReducer.income;

const CategoryOperationModal = ({ image, handleToggleModal, type, categoryId, isStatistic, isCreateNewOperation = true, sum = "", date = "", id }) => {
    const dispatch = useDispatch();
    const balance = useSelector(getBalance);
    const expenses = useSelector(getExpenses);
    const income = useSelector(getIncome);
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
                dateTime: new Date(formattedDate[0], formattedDate[1] - 1, formattedDate[2], 12).toISOString(),
                price: values.sum,
                categoryId: categoryId,
            };
            dispatch(createOperation(form));
        } else {
            const form = {
                dateTime: new Date(formattedDate[0], formattedDate[1] - 1, formattedDate[2], 12).toISOString(),
                price: parseInt(values.sum),
                oldPrice: oldPrice,
                id: id,
            };
            dispatch(updateOperation({ form, isStatistic }));
        }
        handleToggleModal();
    };

    return (
        <div className={styles.container}>
            <div className={styles.categories_card__image_container}>
                <img
                    className={styles.categories_card__image}
                    src={
                        image ||
                        (type === "expenses"
                            ? expenses.find((operation) => operation.id === categoryId).img
                            : income.find((operation) => operation.id === categoryId).img)
                    }
                    alt="Категория"
                />
            </div>
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
                    <button onClick={handleDisable} className={`${styles.categories_card__button} ${styles.categories_card__button__exit}`}>
                        Отменить
                    </button>
                    <button
                        className={`${styles.categories_card__button} ${
                            /^\d+$/.test(values.sum) &&
                            parseInt(values.sum) > 0 &&
                            values.date !== "" &&
                            ((type === "expenses" && balance >= values.sum) || type === "income")
                                ? styles.categories_card__button_active
                                : null
                        }`}
                        type="submit"
                        disabled={
                            !(
                                /^\d+$/.test(values.sum) &&
                                parseInt(values.sum) > 0 &&
                                values.date !== "" &&
                                ((type === "expenses" && balance >= values.sum) || type === "income")
                            )
                        }
                    >
                        Сохранить
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CategoryOperationModal;
