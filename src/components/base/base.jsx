import React from "react";
import styles from "./base.module.css";
import Logo from "../logo/logo";
import ProfileLink from "../profile-link/profile-link";
import Navbar from "../navbar/navbar";
import { Outlet } from "react-router-dom";
const Base = () => {
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
