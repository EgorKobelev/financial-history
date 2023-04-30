import React from "react";
import styles from "./base.module.css";
import Logo from "../logo/logo";
import ProfileLink from "../profile-link/profile-link";
import Navbar from "../navbar/navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Base = () => {
    const isLoading = useSelector((store) => store.userReducer.status.isLoading);
    return (
        <>
            <header className={`container ${styles.header}`}>
                <Logo />
                <ProfileLink />
            </header>
            <main className="container flex">
                <aside>
                    <Navbar />
                </aside>
                <section>
                    <Outlet />
                </section>
            </main>
        </>
    );
};

export default Base;
