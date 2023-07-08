import styles from "./history-page.module.css";

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
    return (
        <div className={styles.history_cover}>
            <div className={styles.history__container}>
                <h2 className={styles.history__title}>История операций</h2>
                <div className={styles.history__operations_container}>
                    {data.map((operation) => {
                        return (
                            <div key={operation.key} className={styles.history__operation}>
                                <p className={styles.operation__date}>{operation.date}</p>
                                <p className={styles.operation__date}>{operation.text}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;
