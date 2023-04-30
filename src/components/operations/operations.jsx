import React from "react";
import styles from "./operations.module.css";
import OperationCard from "../operation-card/operation-card";

const Operations = ({ data, title }) => {
    const [activeModal, setActiveModal] = React.useState(false);

    const handleToggleModal = () => {
        setActiveModal(!activeModal);
    };

    return (
        <div className={styles.operations__container}>
            <div className={styles.operations__header}>
                <h3>{title}</h3>
            </div>
            <ul className={styles.operations__list}>
                {data.map((element, index) => (
                    <OperationCard key={index} element={element} index={index} />
                ))}
            </ul>
        </div>
    );
};

export default Operations;
