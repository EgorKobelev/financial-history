import React from "react";
import styles from "./profile-link.module.css";
import exit_img from "../../images/exit.svg";

const ProfileLink = () => {
    const name = "Егор";
    return (
        <div className={styles.profile_link__container}>
            <div className={styles.profile_link__user}>
                <div className={styles.avatar__container}></div>
                <p>{name}</p>
            </div>
            <img src={exit_img} alt="" />
        </div>
    );
};

export default ProfileLink;
