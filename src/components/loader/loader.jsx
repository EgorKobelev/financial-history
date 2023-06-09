import styles from "./loader.module.css";

const Loader = ({ height = "100px" }) => {
    return (
        <div className={styles.loader__container} style={{ height: height }}>
            <span className={styles.loader}></span>
        </div>
    );
};

export default Loader;
