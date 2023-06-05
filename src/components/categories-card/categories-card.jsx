import React from "react";
import styles from "./categories-card.module.css";
import Modal from "../modal/modal";
import CategoryOperationModal from "../category-operation-modal/category-operation-modal";
import { ReactComponent as EditButton } from "../../images/edit.svg";
import { ReactComponent as CloseButton } from "../../images/close.svg";

const CategoriesCard = ({ title, image, id, sum, type }) => {
    const [modalActive, setModalActive] = React.useState(false);
    const handleToggleModal = () => {
        setModalActive(!modalActive);
    };

    return (
        <>
            <div onClick={handleToggleModal} className={styles.categories_card__container}>
                <h3 className={styles.categories_card__title}>{title}</h3>
                <div className={styles.categories_card__image_container}>
                    <img
                        className={styles.categories_card__image}
                        src={"http://localhost:5216/api/v1/public/Categories/getPictureForCategories/1.png"}
                        alt="Категория"
                    />
                </div>
                <p className={styles.categories_card__balance}>{`₽ ${sum}`}</p>
                <div className={styles.categories_card__func}>
                    <EditButton
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log(123);
                        }}
                        className={`${styles.func__images} ${styles.func__images_edit}`}
                    />
                    <CloseButton
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log(123);
                        }}
                        className={`${styles.func__images} ${styles.func__images_close}`}
                    />
                </div>
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
