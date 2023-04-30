import React from "react";
import styles from "./profile-link.module.css";
import exit_img from "../../images/exit.svg";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../services/actions/user";
import {useNavigate} from "react-router-dom";

const getName = (store) => store.userReducer.user.name

const ProfileLink = () => {
    const dispatch = useDispatch()
    const name = useSelector(getName)
    const navigate = useNavigate()
    const handleNavigate = (e) => {
        e.preventDefault()
        navigate('/profile')
    }
    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout())}
    return (
        <div onClick={handleNavigate} className={styles.profile_link__container}>
            <div className={styles.profile_link__user}>
                <div className={styles.avatar__container}></div>
                <p>{name}</p>
            </div>
            <img onClick={handleLogout} className={styles.profile_link__image} src={exit_img} alt="" />
        </div>
    );
};

export default ProfileLink;
