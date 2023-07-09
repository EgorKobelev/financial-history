import styles from "./history-page.module.css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../../services/actions/messages";
import moment from "moment";
import { clearMessagesState, increaseMessagePage } from "../../services/reducers/messages-slice";

const getMessages = (store) => store.messagesReducer.messages;
const getPage = (store) => store.messagesReducer.page;
const getIsLoading = (store) => store.messagesReducer.isLoading;

const HistoryPage = () => {
    const dispatch = useDispatch();
    const messages = useSelector(getMessages);
    const page = useSelector(getPage);
    const isLoading = useSelector(getIsLoading);

    const listRef = useRef(null);
    useEffect(() => {
        dispatch(clearMessagesState());
    }, []);

    const scrollHandler = () => {
        if (listRef.current.scrollHeight - listRef.current.scrollTop - listRef.current.clientHeight < 50) {
            dispatch(getHistory());
            dispatch(increaseMessagePage());
        }
    };

    useEffect(() => {
        if (listRef && listRef.current) {
            listRef.current.addEventListener("scroll", scrollHandler);
        }
        dispatch(getHistory());
        dispatch(increaseMessagePage(page + 1));

        return () => {
            if (listRef && listRef.current) {
                listRef.current.removeEventListener("scroll", scrollHandler);
            }
        };
    }, [listRef]);

    return (
        <div className={styles.history_cover}>
            <div className={styles.history__container}>
                <h2 className={styles.history__title}>История операций</h2>
                <ul ref={listRef} className={styles.history__operations_container}>
                    {messages && messages.length === 0 && page >= 2 && !isLoading && <p>Вы еще не совершали никаких действий.</p>}
                    {messages.map((operation, index) => {
                        return (
                            <li key={index} className={styles.history__operation}>
                                <p className={styles.operation__text}>{moment.utc(operation.dateTime).format("DD-MM-YYYY")}</p>
                                <p className={styles.operation__text}>{operation.message}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default HistoryPage;
