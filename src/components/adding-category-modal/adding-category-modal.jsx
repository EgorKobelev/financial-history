import styles from "./adding-category-modal.module.css";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { createCategory, updateCategory } from "../../services/actions/category";
import { useState } from "react";
import ImagesChoosing from "../images-choosing/images-choosin";
import defaultImage from "../../images/default-image.png";
import { useSelector } from "react-redux";

const getExpenses = (store) => store.categoryReducer.expenses;
const getIncome = (store) => store.categoryReducer.income;

const AddingCategoryModal = ({ handleToggleModal, id, type }) => {
    const income = useSelector(getIncome);
    const expenses = useSelector(getExpenses);
    const category =
        type === "expenses" ? expenses.find((operation) => operation.id === id) : income.find((operation) => operation.id === id);
    const [isShowImages, setIsShowImages] = useState(false);
    const [img, setImg] = useState(category ? category.img : null);
    const { values, handleChange } = useForm({
        name: category ? category?.name : null,
        type: type || "",
    });

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        if (id) {
            dispatch(updateCategory({ ...values, img: img, categoryId: id }));
        } else {
            dispatch(createCategory({ ...values, img: img }));
        }
        handleToggleModal();
    };
    return (
        <>
            <div className={styles.container}>
                <div className={styles.categories_card__avatar_container}>
                    <div className={styles.categories_card__image_container}>
                        <img src={img || defaultImage} alt="аватар" className={styles.categories_card__avatar} />
                    </div>
                    <button onClick={() => setIsShowImages(!isShowImages)} className={styles.categories_card__avatar_button}>
                        Выбрать иконку
                    </button>
                </div>
                <form onSubmit={onSubmit}>
                    <input
                        className={styles.categories_card__input}
                        onChange={handleChange}
                        value={values.name}
                        placeholder="Введите Название"
                        type="text"
                        name="name"
                    />
                    <select
                        onChange={(e) => {
                            e.target.blur();
                            handleChange(e);
                        }}
                        value={values.type}
                        className={styles.categories_card__select}
                        name="type"
                    >
                        <option value="" disabled selected hidden>
                            Выберите группу
                        </option>
                        <option selected={type === "income"} value="income">
                            Доходы
                        </option>
                        <option selected={type === "expenses"} value="expenses">
                            Расходы
                        </option>
                    </select>
                    <div className="flex">
                        <button
                            onClick={handleToggleModal}
                            className={`${styles.categories_card__button} ${styles.categories_card__button__exit}`}
                        >
                            Отменить
                        </button>
                        <button
                            className={`${styles.categories_card__button} ${
                                (values.type === "income" || values.type === "expenses") &&
                                values.name !== "" &&
                                values.type !== "" &&
                                (id ? category.name !== values.name || category.img !== img || category.type !== values.type : true)
                                    ? styles.categories_card__button_active
                                    : null
                            }`}
                            disabled={
                                !((values.type === "income" || values.type === "expenses") && values.name !== "" && values.type !== "")
                            }
                            type="submit"
                        >
                            {id ? "Изменить" : "Сохранить"}
                        </button>
                    </div>
                </form>
            </div>{" "}
            <div className={styles.images__container} style={{ opacity: isShowImages ? 1 : 0, zIndex: isShowImages ? 100 : -10 }}>
                <ImagesChoosing setImg={setImg} setIsShowImages={() => setIsShowImages(!isShowImages)} />
            </div>
        </>
    );
};

export default AddingCategoryModal;
