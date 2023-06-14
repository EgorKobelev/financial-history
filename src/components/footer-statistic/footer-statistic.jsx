import styles from "./footer-statistic.module.css";
import { COLORS } from "../../utils/constants";
import ToolTip from "../tooltip/tooltip";

const FooterStatistic = ({ labels, data }) => {
    return (
        <div className={styles.footer__container}>
            {labels.map((label, index) => {
                return (
                    <div key={index} className={styles.footer__item}>
                        <div className={styles.item__circle} style={{ backgroundColor: COLORS[index] }}></div>
                        <ToolTip tooltip={`${label}: ${data[index]}₽`.length >= 24 ? `${label}: ${data[index]}₽` : null}>
                            <p className={styles.item__text}>{`${label}: ${data[index]}₽`}</p>
                        </ToolTip>
                    </div>
                );
            })}
        </div>
    );
};

export default FooterStatistic;
