import React from "react";
import styles from "./categories.module.css";
import CategoriesCard from "../categories-card/categories-card";
import icon from "../../images/categories/circle.svg";
import Modal from "../modal/modal";
import addButton from "../../images/add-button.svg";
import AddingCategoryModal from "../adding-category-modal/adding-category-modal";

const Categories = ({ data, title }) => {
    const [modalActive, setModalActive] = React.useState(false);
    const handleToggleModal = () => {
        setModalActive(!modalActive);
    };

    return (
        <div className={styles.categories__container}>
            <h2 className={styles.categories__title}>{title}</h2>
            <div className={styles.categories__cards_container}>
                {data.map((element, index) => (
                    <CategoriesCard key={index} title={element.name} image={icon} id={element.id} sum={element.sum} />
                ))}
                <div onClick={handleToggleModal} className={styles.categories__card_container}>
                    <img src={addButton} className={styles.categories__card_image} alt="Категория" />
                </div>
            </div>
            {modalActive && (
                <Modal title={"Добавить категорию"} handleToggleModal={handleToggleModal}>
                    <AddingCategoryModal handleToggleModal={handleToggleModal} />
                </Modal>
            )}
        </div>
    );
};

export default Categories;
