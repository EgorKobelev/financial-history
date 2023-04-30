import React from "react";
import CategoryOperationModal from "../category-operation-modal/category-operation-modal";
import Modal from "../modal/modal";
import styles from "./operation-card.module.css";
import deleteImage from "../../images/delete.svg";
import editImage from "../../images/edit.svg";

const OperationCard = ({ element, index }) => {
    const [activeModal, setActiveModal] = React.useState(false);

    const handleToggleModal = () => {
        setActiveModal(!activeModal);
    };
    return (
        <div className={styles.operations__list_item_container}>
            <p className={styles.list_item__date}>{element.date}</p>
            <li className={styles.operations__list_item} key={index}>
                <p className={styles.list__text}>{`${element.category} - ${element.money} ₽`}</p>
                <div className={styles.list__images}>
                    <img className={styles.list__images__first_image} src={deleteImage} alt="Удалить" />
                    <img
                        className={styles.list__images__second_image}
                        src={editImage}
                        alt="Отредактировать"
                        onClick={handleToggleModal}
                    />
                </div>
            </li>
            {activeModal && (
                <Modal handleToggleModal={handleToggleModal} title={element.category}>
                    <CategoryOperationModal image={element.image} date={element.date} sum={element.money} />
                </Modal>
            )}
        </div>
    );
};

export default OperationCard;
