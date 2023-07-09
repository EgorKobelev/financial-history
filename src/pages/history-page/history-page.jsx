import styles from "./history-page.module.css";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { getHistory } from "../../services/actions/messages";

const data = [
    { id: "1", date: "21.10.2022", text: "категория удалена" },
    { id: "2", date: "21.10.2022", text: "категория добавлена" },
    { id: "3", date: "21.10.2022", text: "категория удалена" },
    { id: "4", date: "21.10.2022", text: "категория добавлена" },
    { id: "5", date: "21.10.2022", text: "категория удалена" },
    { id: "6", date: "21.10.2022", text: "категория добавлена" },
    { id: "7", date: "21.10.2022", text: "категория удалена" },
    { id: "8", date: "21.10.2022", text: "категория добавлена" },
]; // рассмотреть случай когда слишком большой текст

const HistoryPage = () => {
    const dispatch = useDispatch();

    const listRef = useRef(null);
    const scrollHandler = () => {
        if (listRef.current.scrollHeight - listRef.current.scrollTop - listRef.current.clientHeight < 10) {
            dispatch(getHistory());
        }
    };

    useEffect(() => {
        if (listRef) {
            listRef.current.addEventListener("scroll", scrollHandler);
        }
        return () => {
            if (listRef && listRef.current) {
                listRef.current.removeEventListener("scroll", scrollHandler);
            }
        };
    }, [listRef]);

    useEffect(() => {
        dispatch(getHistory());
    }, []);

    return (
        <div className={styles.history_cover}>
            <div className={styles.history__container}>
                <h2 className={styles.history__title}>История операций</h2>
                <ul ref={listRef} className={styles.history__operations_container}>
                    {data.map((operation) => {
                        return (
                            <li key={operation.key} className={styles.history__operation}>
                                <p className={styles.operation__date}>{operation.date}</p>
                                <p className={styles.operation__date}>{operation.text}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default HistoryPage;
