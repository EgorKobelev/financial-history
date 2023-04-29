import React from "react";
import styles from "./categories-card.module.css";
import Modal from "../modal/modal";
import CategoryOperationModal from "../category-operation-modal/category-operation-modal";

const CategoriesCard = ({ title, image }) => {
    const [modalActive, setModalActive] = React.useState(false);
    const handleToggleModal = () => {
        setModalActive(!modalActive);
    };

    return (
        <>
            <div onClick={handleToggleModal} className={styles.categories_card__container}>
                <h3 className={styles.categories_card__title}>{title}</h3>
                <img className={styles.categories_card__image} src={image} alt="Категория" />
                <p className={styles.categories_card__balance}>{`₽ ${0}`}</p>
            </div>
            {modalActive && (
                <Modal title={title} handleToggleModal={handleToggleModal}>
                    <CategoryOperationModal image={image} />
                </Modal>
            )}
        </>
    );
};

export default CategoriesCard;
