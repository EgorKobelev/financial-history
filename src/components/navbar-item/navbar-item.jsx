import React, { FC, cloneElement } from "react";
import styles from "./navbar-item.module.css";
import { NavLink } from "react-router-dom";

const NavbarItem = ({ name, to }) => {
    return (
        <NavLink to={to}>
            {({ isActive }) => (
                <>
                    <button className={isActive ? styles.active : styles.inactive}>{name}</button>
                </>
            )}
        </NavLink>
    );
};

export default NavbarItem;
