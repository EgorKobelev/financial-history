import React from "react";
import CategoryOperationModal from "../category-operation-modal/category-operation-modal";
import Modal from "../modal/modal";
import styles from "./operation-card.module.css";
import deleteImage from "../../images/delete.svg";
import editImage from "../../images/edit.svg";
import moment from "moment";
import icon from "../../images/categories/circle.svg";
import { useDispatch, useSelector } from "react-redux";
import { deleteOperaion } from "../../services/actions/operation";

const getExpenses = (store) => store.categoryReducer.expenses;
const getIncome = (store) => store.categoryReducer.income;

const OperationCard = ({ element, type }) => {
    const expenses = useSelector(getExpenses);
    const income = useSelector(getIncome);
    const dispatch = useDispatch();
    const [activeModal, setActiveModal] = React.useState(false);

    const handleToggleModal = () => {
        setActiveModal(!activeModal);
    };

    const handleDeleteOperation = () => {
        dispatch(deleteOperaion(element.id));
    };

    return (
        <div className={styles.operations__list_item_container}>
            <p className={styles.list_item__date}>{moment.utc(element.dateTime).format("DD-MM-YYYY")}</p>
            <li className={styles.operations__list_item}>
                <p className={styles.list__text}>{`${element.nameCategory} - ${element.price} ₽`}</p>
                <div className={styles.list__images}>
                    <img className={styles.list__images__first_image} onClick={handleDeleteOperation} src={deleteImage} alt="Удалить" />
                    <img className={styles.list__images__second_image} src={editImage} alt="Отредактировать" onClick={handleToggleModal} />
                </div>
            </li>
            {activeModal && (
                <Modal handleToggleModal={handleToggleModal} title={element.category}>
                    <CategoryOperationModal
                        type={type}
                        isCreateNewOperation={false}
                        image={icon}
                        date={moment.utc(element.dateTime).format("YYYY-MM-DD")}
                        sum={element.price}
                        handleToggleModal={handleToggleModal}
                        id={element.id}
                        categoryId={
                            expenses.find((category) => category.name === element.nameCategory)
                                ? expenses.find((category) => category.name === element.nameCategory).id
                                : income.find((category) => category.name === element.nameCategory).id
                        }
                    />
                </Modal>
            )}
        </div>
    );
};

export default OperationCard;
