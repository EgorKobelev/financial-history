import styles from "./tabs.module.css";
import { useState } from "react";
import { TAB_WEEK, TAB_ALL_TIME, TAB_MONTH, TAB_PERIOD, TAB_YEAR } from "../../utils/constants";

const Tabs = () => {
    const [activeTab, setActiveTabs] = useState(TAB_WEEK);

    return (
        <ul className={styles.tabs__container}>
            <li onClick={() => setActiveTabs(TAB_WEEK)} className={`${styles.tabs__items} ${activeTab === TAB_WEEK ? styles.active_tab : null}`}>
                Неделя
            </li>
            <li onClick={() => setActiveTabs(TAB_MONTH)} className={`${styles.tabs__items} ${activeTab === TAB_MONTH ? styles.active_tab : null}`}>
                Месяц
            </li>
            <li onClick={() => setActiveTabs(TAB_YEAR)} className={`${styles.tabs__items} ${activeTab === TAB_YEAR ? styles.active_tab : null}`}>
                Год
            </li>
            <li onClick={() => setActiveTabs(TAB_ALL_TIME)} className={`${styles.tabs__items} ${activeTab === TAB_ALL_TIME ? styles.active_tab : null}`}>
                Все время
            </li>
            <li onClick={() => setActiveTabs(TAB_PERIOD)} className={`${styles.tabs__items} ${activeTab === TAB_PERIOD ? styles.active_tab : null}`}>
                Интервал
            </li>
        </ul>
    );
};

export default Tabs;
