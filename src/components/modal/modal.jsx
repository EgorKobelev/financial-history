import React, { memo, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import closeIcon from "../../images/close.svg";

const modalContainer = document.getElementById("modal-container");
const body = document.body;

const Modal = memo(({ children, handleToggleModal, ...props }) => {
    const handleEscPressed = (event) => (event.code === "Escape" ? handleToggleModal() : null);
    useEffect(() => {
        body.style.overflow = "hidden";
        modalContainer.classList.add("modal-container--active");
        document.addEventListener("keydown", handleEscPressed);
        return () => {
            modalContainer.classList.remove("modal-container--active");
            body.style.overflow = "auto";
            document.removeEventListener("keydown", handleEscPressed);
        };
    }, []);

    return ReactDOM.createPortal(
        <div
            className={`${styles.modal} ${props.container} pt-10 pl-10 pb-10 pr-10`}
            onKeyDown={(event) => {
                if (event.key === "Enter") {
                    handleToggleModal();
                }
            }}
        >
            <ModalOverlay handleToggleModal={handleToggleModal} />
            <div className={styles.button__container}>
                <button className={styles.button} onClick={handleToggleModal}>
                    <img src={closeIcon} alt="закрыть" />
                </button>
            </div>
            <div>
                <p className={`text text_type_main-large ${styles.title} mr-9`}>{props.title}</p>
            </div>
            {children}
        </div>,
        modalContainer
    );
});

export default Modal;
