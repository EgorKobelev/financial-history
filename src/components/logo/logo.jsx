import React from "react";
import styles from "./logo.module.css";
import {useNavigate} from "react-router-dom";

const Logo = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/")
    }
  return (
    <button onClick={handleClick} className={styles.logo}>
      <p className={styles.logo__text}>66Бюджет</p>
    </button>
  );
};

export default Logo;
