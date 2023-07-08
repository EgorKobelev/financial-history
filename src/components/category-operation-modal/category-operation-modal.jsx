import styles from "./category-operation-modal.module.css";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { createOperation, updateOperation } from "../../services/actions/operation";
import ToolTip from "../tooltip/tooltip";
import defaultImage from "../../images/default-image.png";

const getBalance = (store) => store.operationReducer.sum.balance;
const getExpenses = (store) => store.categoryReducer.expenses;
const getIncome = (store) => store.categoryReducer.income;

const CategoryOperationModal = ({
    image,
    handleToggleModal,
    type,
    categoryId,
    isStatistic,
    isCreateNewOperation = true,
    sum = "",
    date = new Date().toISOString().split("T")[0],
    id,
}) => {
    const dispatch = useDispatch();
    const balance = useSelector(getBalance);
    const expenses = useSelector(getExpenses);
    const income = useSelector(getIncome);
    const { values, handleChange } = useForm({
        sum: sum,
        date: date,
    });
    const oldPrice = sum;

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
                price: values.sum,
                oldPrice: oldPrice,
                id: id,
            };
            dispatch(updateOperation({ form, isStatistic, type }));
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
                        defaultImage ||
                        (type === "expenses"
                            ? expenses.find((operation) => operation.id === categoryId).img
                            : income.find((operation) => operation.id === categoryId).img)
                    }
                    alt="Категория"
                />
            </div>
            <div style={{ marginBottom: 20 }}>
                <ToolTip tooltip={`${values.sum}`.length >= 24 ? `₽ ${values.sum || 0}` : null}>
                    <p className={styles.categories_card__balance}>{`₽ ${values.sum || 0}`}</p>
                </ToolTip>
            </div>
            {type === "expenses" && parseInt(sum + balance) < values.sum && (
                <p className={styles.categories_card__attention}>Введи или пополните баланс</p>
            )}
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
                    max={`${new Date().toISOString().substr(0, 10)}`}
                />
                <div className="flex">
                    <button
                        onClick={handleToggleModal}
                        className={`${styles.categories_card__button} ${styles.categories_card__button__exit}`}
                    >
                        Отменить
                    </button>
                    <button
                        className={`${styles.categories_card__button} ${
                            parseInt(values.sum) > 0 &&
                            values.date !== "" &&
                            ((type === "expenses" && parseInt(sum + balance) >= values.sum) || type === "income")
                                ? styles.categories_card__button_active
                                : null
                        }`}
                        type="submit"
                        disabled={
                            !(
                                parseInt(values.sum) > 0 &&
                                values.date !== "" &&
                                ((type === "expenses" && parseInt(sum + balance) >= values.sum) || type === "income")
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
