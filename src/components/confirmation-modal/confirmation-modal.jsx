import { memo, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./confirmation-modal.module.css";
import { ReactComponent as CloseButton } from "../../images/close.svg";
import { toast } from "react-toastify";

const modalContainer = document.getElementById("modal-container");
const body = document.body;

const ConfirmationModal = memo(({ onClick, handleToggleModal, ...props }) => {
    const handleEscPressed = (event) => (event.code === "Escape" ? handleToggleModal() : null);
    useEffect(() => {
        body.style.overflow = "hidden";
        modalContainer.classList.add("confirmation-container--active");
        document.addEventListener("keydown", handleEscPressed);
        toast.dismiss();
        return () => {
            modalContainer.classList.remove("confirmation-container--active");
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
            <div className={styles.button__container}>
                <CloseButton className={styles.modal__close_icon} onClick={handleToggleModal} />
            </div>
            <div>
                <p className={`${styles.title}`}>{props.title}</p>
            </div>
            <div className={styles.modal__actions_container}>
                <button
                    onClick={() => {
                        onClick();
                        handleToggleModal();
                    }}
                    className={`${styles.modal__button} ${styles.modal__button_yes}`}
                >
                    Да
                </button>
                <button onClick={handleToggleModal} className={styles.modal__button}>
                    Нет
                </button>
            </div>
        </div>,
        modalContainer
    );
});

export default ConfirmationModal;
