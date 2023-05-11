import styles from "./adding-category-modal.module.css";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { createCategory } from "../../services/actions/category";

const initialValues = {
    name: "",
    type: "",
};

const AddingCategoryModal = ({ handleToggleModal }) => {
    const { values, handleChange, setValues } = useForm({
        ...initialValues,
    });

    const dispatch = useDispatch();

    const handleDisable = (e) => {
        e.preventDefault();
        setValues({ ...initialValues });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createCategory(values));
        handleToggleModal();
    };

    return (
        <div className={styles.container}>
            <div className={styles.categories_card__avatar_container}>
                <div className={styles.categories_card__avatar}></div>
                <button className={styles.categories_card__avatar_button}>Выбрать иконку</button>
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
                    onChange={(e) => handleChange(e)}
                    value={values.type}
                    className={styles.categories_card__select}
                    name="type"
                >
                    <option value="" disabled selected hidden>
                        Выберите группу
                    </option>
                    <option value="income">Доходы</option>
                    <option value="expenses">Расходы</option>
                </select>
                <div className="flex">
                    <button
                        onClick={handleDisable}
                        className={`${styles.categories_card__button} ${styles.categories_card__button__exit}`}
                    >
                        Отменить
                    </button>
                    <button
                        className={`${styles.categories_card__button} ${
                            values.category !== "" && values.category !== ""
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

export default AddingCategoryModal;
