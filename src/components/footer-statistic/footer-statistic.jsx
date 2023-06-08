import styles from "./footer-statistic.module.css";
import { COLORS } from "../../utils/constants";

const FooterStatistic = ({ labels, data }) => {
    return (
        <div className={styles.footer__container}>
            {labels.map((label, index) => {
                return (
                    <div key={index} className={styles.footer__item}>
                        <div className={styles.item__circle} style={{ backgroundColor: COLORS[index] }}></div>
                        <p>{`${label} - ${data[index]}₽`}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default FooterStatistic;
