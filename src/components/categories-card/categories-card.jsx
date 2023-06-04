import React from "react";
import styles from "./categories-card.module.css";
import Modal from "../modal/modal";
import CategoryOperationModal from "../category-operation-modal/category-operation-modal";

const CategoriesCard = ({ title, image, id, sum, type }) => {
    const [modalActive, setModalActive] = React.useState(false);
    const handleToggleModal = () => {
        setModalActive(!modalActive);
    };

    return (
        <>
            <div onClick={handleToggleModal} className={styles.categories_card__container}>
                <h3 className={styles.categories_card__title}>{title}</h3>
                <img className={styles.categories_card__image} src={image} alt="Категория" />
                <p className={styles.categories_card__balance}>{`₽ ${sum}`}</p>
            </div>
            {modalActive && (
                <Modal title={title} handleToggleModal={handleToggleModal}>
                    <CategoryOperationModal handleToggleModal={handleToggleModal} isCreateNewCategory={true} categoryId={id} image={image} type={type} />
                </Modal>
            )}
        </>
    );
};

export default CategoriesCard;
