import styles from "./graphics.module.css";
import Tabs from "../tabs/tabs";
import { Doughnut } from "react-chartjs-2";
import { COLORS, OPTIONS_CHART } from "../../utils/constants";
import { useEffect, useState } from "react";
import FooterStatistic from "../footer-statistic/footer-statistic";

const Graphics = ({ title, labels, data, sum }) => {
    const [graphicData, setGraphicData] = useState(null);

    useEffect(() => {
        setGraphicData({
            labels: labels,
            datasets: [
                {
                    label: "руб",
                    data: data,
                    backgroundColor: COLORS,
                },
            ],
        });
    }, [data, labels]);

    return (
        graphicData && (
            <div className={styles.graphics__container}>
                <h2 className={styles.graphics__title}>{title}</h2>
                <Tabs />
                <div className={styles.doughnut__container}>
                    <Doughnut options={OPTIONS_CHART} data={graphicData} />
                    <div className={styles.doughnut__sum}>{`₽ ${sum}`}</div>
                </div>
                <FooterStatistic labels={labels} data={data} />
            </div>
        )
    );
};

export default Graphics;
