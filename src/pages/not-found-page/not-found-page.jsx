import { Link } from "react-router-dom";
import styles from "./not-found-page.module.css";
const NotFoundPage = () => {
    return (
        <div className={`${styles.container}`}>
            <div className={styles.err}>404 ERROR</div>
            <i className={`${styles.far} ${styles.fa_question_circle} ${styles.fa_spin}`}></i>
            <div className="msg">
                Может быть, эта страница переместилась? Была удалена? Ее никогда не существовало?
                <p>
                    Переместитесь на{" "}
                    <Link to="/" className={styles.href} href="#">
                        главную
                    </Link>{" "}
                    и попробуйте снова.
                </p>
            </div>
        </div>
    );
};

export default NotFoundPage;
