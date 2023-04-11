import React from "react";
import styles from "./navbar.module.css";
import NavbarItem from "../navbar-item/navbar-item";

const Navbar = () => {
    return (
        <div className={styles.navbar__container}>
            <div className={styles.navbar__item}>
                <NavbarItem to="/" name={"Главная"} />
            </div>
            <div className={styles.navbar__item}>
                <NavbarItem to="/statistics" name={"Статистика"} />
            </div>
            <div className={styles.navbar__item}>
                <NavbarItem to="/profile" name={"Профиль"} />
            </div>
        </div>
    );
};

export default Navbar;
