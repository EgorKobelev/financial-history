import { memo, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { ReactComponent as CloseButton } from "../../images/close.svg";

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
            className={`${styles.modal}`}
            onKeyDown={(event) => {
                if (event.key === "Enter") {
                    handleToggleModal();
                }
            }}
        >
            <ModalOverlay handleToggleModal={handleToggleModal} />
            <div className={styles.button__container}>
                <CloseButton className={styles.modal__close_icon} onClick={handleToggleModal} />
            </div>
            <div>
                <p className={`${styles.title}`}>{props.title}</p>
            </div>
            {children}
        </div>,
        modalContainer
    );
});

export default Modal;
