import React from "react";
import styles from "./main-page.module.css";
import Finance from "../../components/finance/finance";
import Categories from "../../components/categories/categories";
import Operations from "../../components/operations/operations";

const MainPage = () => {
    return (
        <div className="flex">
            <div className={styles.main_page__container}>
                <Finance />
                <Categories />
            </div>
            <div className={styles.main_page__operations}>
                <Operations />
            </div>
        </div>
    );
};

export default MainPage;
