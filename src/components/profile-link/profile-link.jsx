import styles from "./profile-link.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/actions/user";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ExitButton } from "../../images/exit.svg";
import defaultImage from "../../images/avatar.svg";

const getUser = (store) => store.userReducer.user;

const ProfileLink = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const navigate = useNavigate();
    const handleNavigate = (e) => {
        e.preventDefault();
        navigate("/profile");
    };
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };
    return (
        <div onClick={handleNavigate} className={styles.profile_link__container}>
            <div className={styles.profile_link__user}>
                <img src={user.img || defaultImage} alt="аватар" className={styles.avatar__container} />
                <p>{user.name}</p>
            </div>
            <ExitButton onClick={handleLogout} className={styles.profile_link__image} alt="кнопка выхода" />
        </div>
    );
};

export default ProfileLink;
