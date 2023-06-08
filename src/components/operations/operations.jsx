import styles from "./operations.module.css";
import OperationCard from "../operation-card/operation-card";
import { useEffect, useRef } from "react";

const Operations = ({ data, type, title, getNewOperations }) => {
    const listRef = useRef(null);
    const scrollHandler = () => {
        if (listRef.current.scrollHeight - listRef.current.scrollTop - listRef.current.clientHeight < 10) {
            getNewOperations(type);
        }
    };

    useEffect(() => {
        if (listRef && getNewOperations) {
            listRef.current.addEventListener("scroll", scrollHandler);
        }
        return () => {
            if (listRef && listRef.current && getNewOperations) {
                listRef.current.removeEventListener("scroll", scrollHandler);
            }
        };
    }, [listRef]);

    return (
        <div className={styles.operations__container}>
            <div className={styles.operations__header}>
                <h3>{title}</h3>
            </div>
            <ul ref={listRef} className={`${styles.operations__list} operations__list`}>
                {data.map((element) => (
                    <OperationCard isStatistic={getNewOperations ? true : false} key={element.id} type={type} element={element} />
                ))}
            </ul>
            <div className={styles.operations__footer}></div>
        </div>
    );
};

export default Operations;
