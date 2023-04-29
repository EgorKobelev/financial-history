import styles from "./adding-category-modal.module.css";
import { useForm } from "../../hooks/useForm";

const initialValues = {
    sum: "",
    category: "",
};

const AddingCategoryModal = () => {
    const { values, handleChange, setValues } = useForm({
        ...initialValues,
    });

    const handleDisable = (e) => {
        e.preventDefault();
        setValues({ ...initialValues });
    };

    return (
        <div className={styles.container}>
            <div className={styles.categories_card__avatar_container}>
                <div className={styles.categories_card__avatar}></div>
                <button className={styles.categories_card__avatar_button}>Выбрать иконку</button>
            </div>
            <form>
                <input
                    className={styles.categories_card__input}
                    onChange={handleChange}
                    value={values.sum}
                    placeholder="Введите Сумму"
                    type="text"
                    name="sum"
                />
                <select
                    onChange={(e) => handleChange(e)}
                    value={values.category}
                    className={styles.categories_card__select}
                    name="category"
                >
                    <option value="" disabled selected hidden>
                        Выберите группу
                    </option>
                    <option value="доходы">Доходы</option>
                    <option value="расходы">Расходы</option>
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
