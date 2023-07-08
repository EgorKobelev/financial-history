import React from "react";
import CategoryOperationModal from "../category-operation-modal/category-operation-modal";
import Modal from "../modal/modal";
import styles from "./operation-card.module.css";
import { ReactComponent as DeleteIcon } from "../../images/delete.svg";
import { ReactComponent as EditButton } from "../../images/edit.svg";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteOperaion } from "../../services/actions/operation";
import ConfirmationModal from "../confirmation-modal/confirmation-modal";
import ToolTip from "../tooltip/tooltip";

const getExpenses = (store) => store.categoryReducer.expenses;
const getIncome = (store) => store.categoryReducer.income;

const OperationCard = ({ element, type, isStatistic }) => {
    const expenses = useSelector(getExpenses);
    const income = useSelector(getIncome);
    const dispatch = useDispatch();
    const [activeModal, setActiveModal] = React.useState(false);
    const [confirmationActive, setConfirmationActive] = React.useState(false);

    const handleToggleModal = () => {
        setActiveModal(!activeModal);
    };

    const handleToggleConf = () => {
        setConfirmationActive(!confirmationActive);
    };

    const handleDeleteOperation = () => {
        dispatch(deleteOperaion({ id: element.id, isStatistic, type }));
    };

    return (
        <div className={styles.operations__list_item_container}>
            <p className={styles.list_item__date}>{moment.utc(element.dateTime).format("DD-MM-YYYY")}</p>
            <li className={styles.operations__list_item}>
                <ToolTip
                    width={200}
                    tooltip={
                        `${element.nameCategory}: ${element.price} ₽`.length >= 12
                            ? `${`${element.nameCategory}: ${element.price} ₽`}`
                            : null
                    }
                >
                    <p className={styles.list__text}>{`${element.nameCategory}: ${element.price} ₽`}</p>
                </ToolTip>
                <div className={styles.list__images}>
                    <DeleteIcon onClick={handleToggleConf} className={styles.list__images__first_image} alt="Удалить" />
                    <EditButton onClick={handleToggleModal} className={styles.list__images__second_image} alt="Отредактировать" />
                </div>
            </li>
            {activeModal && (
                <Modal handleToggleModal={handleToggleModal} title={element.category}>
                    <CategoryOperationModal
                        isStatistic={isStatistic}
                        type={type}
                        isCreateNewOperation={false}
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
            {confirmationActive && (
                <ConfirmationModal
                    onClick={handleDeleteOperation}
                    handleToggleModal={handleToggleConf}
                    title="Вы точно хотите удалить?"
                ></ConfirmationModal>
            )}
        </div>
    );
};

export default OperationCard;
