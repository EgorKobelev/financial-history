import React from "react";
import styles from "./operations.module.css";
import OperationCard from "../operation-card/operation-card";

const Operations = ({ data, title }) => {
    return (
        <div className={styles.operations__container}>
            <div className={styles.operations__header}>
                <h3>{title}</h3>
            </div>
            <ul className={styles.operations__list}>
                {data.map((element) => (
                    <OperationCard key={element.id} element={element} />
                ))}
            </ul>
        </div>
    );
};

export default Operations;
