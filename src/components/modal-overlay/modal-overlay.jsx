import React, { memo } from "react";
import styles from "./modal-overlay.module.css";

const ModalOverlay = memo(({ handleToggleModal }) => {
    return <div onClick={handleToggleModal} className={styles.background}></div>;
});

export default ModalOverlay;
