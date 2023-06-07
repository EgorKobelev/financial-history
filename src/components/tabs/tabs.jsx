import styles from "./tabs.module.css";
import { TAB_WEEK, TAB_ALL_TIME, TAB_MONTH, TAB_PERIOD, TAB_YEAR } from "../../utils/constants";
import { useEffect, useState } from "react";
import CustomTabCalender from "../custom-tab-calendar/custom-tab-calendar";

const Tabs = ({ activeTab, handleGetData, type }) => {
    const [activeCalendar, setActiveCalendar] = useState(false);

    useEffect(() => {
        const toDate = new Date().toISOString();
        const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 - 12 * 60 * 60 * 1000).toISOString();
        handleGetData(TAB_WEEK, fromDate, toDate, type);
    }, []);
    return (
        <>
            <ul className={styles.tabs__container}>
                <li
                    onClick={() => {
                        setActiveCalendar(false);
                        const toDate = new Date().toISOString();
                        const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 - 12 * 60 * 60 * 1000).toISOString();
                        handleGetData(TAB_WEEK, fromDate, toDate, type);
                    }}
                    className={`${styles.tabs__items} ${activeTab === TAB_WEEK ? styles.active_tab : null}`}
                >
                    Неделя
                </li>
                <li
                    onClick={() => {
                        setActiveCalendar(false);
                        const toDate = new Date().toISOString();
                        const fromDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000 - 12 * 60 * 60 * 1000).toISOString();
                        handleGetData(TAB_MONTH, fromDate, toDate, type);
                    }}
                    className={`${styles.tabs__items} ${activeTab === TAB_MONTH ? styles.active_tab : null}`}
                >
                    Месяц
                </li>
                <li
                    onClick={() => {
                        setActiveCalendar(false);
                        const toDate = new Date();
                        const fromDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000 - 12 * 60 * 60 * 1000);
                        handleGetData(TAB_YEAR, fromDate, toDate, type);
                    }}
                    className={`${styles.tabs__items} ${activeTab === TAB_YEAR ? styles.active_tab : null}`}
                >
                    Год
                </li>
                <li
                    onClick={() => {
                        setActiveCalendar(false);
                        const toDate = new Date();
                        const fromDate = new Date(Date.now() - 1000 * 365 * 24 * 60 * 60 * 1000 - 12 * 60 * 60 * 1000);
                        handleGetData(TAB_ALL_TIME, fromDate, toDate, type);
                    }}
                    className={`${styles.tabs__items} ${activeTab === TAB_ALL_TIME ? styles.active_tab : null}`}
                >
                    Все время
                </li>
                <li
                    onClick={() => setActiveCalendar(true)}
                    style={{ position: "relative" }}
                    className={`${styles.tabs__items} ${activeTab === TAB_PERIOD ? styles.active_tab : null}`}
                >
                    {activeCalendar && <CustomTabCalender setActiveCalendar={setActiveCalendar} handleGetData={handleGetData} type={type} tab={TAB_PERIOD} />}
                    Интервал
                </li>
            </ul>
        </>
    );
};

export default Tabs;
