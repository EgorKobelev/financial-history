import styles from "./graphics.module.css";
import Tabs from "../tabs/tabs";
import { Doughnut } from "react-chartjs-2";
import { COLORS, OPTIONS_CHART } from "../../utils/constants";
import { useEffect, useState } from "react";
import FooterStatistic from "../footer-statistic/footer-statistic";
import Loader from "../loader/loader";
import ToolTip from "../tooltip/tooltip";

const Graphics = ({
    title,
    labels,
    data,
    sum,
    setActiveTabs,
    activeTab,
    type,
    handleGetData,
    isLoading,
    isNotShowLoaderAfterDelay,
    setIsNotShowLoaderAfterDelay,
}) => {
    const [graphicData, setGraphicData] = useState(null);

    useEffect(() => {
        setIsNotShowLoaderAfterDelay(false);
        let timeFunc;
        if (isLoading) {
            timeFunc = setTimeout(() => {
                setIsNotShowLoaderAfterDelay(true);
            }, 1000);
        } else {
            setIsNotShowLoaderAfterDelay(false);
        }
        return () => {
            if (timeFunc) {
                clearTimeout(timeFunc);
            }
        };
    }, [isLoading]);

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
    }, [data]);
    return (
        <div className={styles.graphics__container}>
            <h2 className={styles.graphics__title}>{title}</h2>
            <Tabs setActiveTabs={setActiveTabs} activeTab={activeTab} handleGetData={handleGetData} type={type} />
            {isLoading && isNotShowLoaderAfterDelay && <Loader height="300px" />}
            {!isLoading && data.length === 0 && (
                <div className={styles.graphics__no_data_container}>
                    <p className={styles.graphics__no_data_container_text}>Нет данных</p>
                </div>
            )}
            {data.length !== 0 && !isLoading && (
                <>
                    <div className={styles.doughnut__container}>
                        <Doughnut options={OPTIONS_CHART} data={graphicData} />
                        <ToolTip className={styles.center_tooltip} tooltip={`₽ ${sum}`.length >= 14 ? `₽ ${sum}` : null}>
                            <div className={styles.doughnut__sum}>{`₽ ${sum}`}</div>
                        </ToolTip>
                    </div>
                    <FooterStatistic labels={labels} data={data} />
                </>
            )}
        </div>
    );
};

export default Graphics;
