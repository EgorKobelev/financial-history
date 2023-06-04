import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import styles from "./statistic-page.module.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Graphics from "../../components/graphics/graphics";
import { SLIDER_PARAMS } from "../../utils/constants";
register();

ChartJS.register(ArcElement, Tooltip, Legend);

const MySwiper = () => {
    const swiperRef = useRef(null);

    const labels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];
    const data = [12, 19, 3, 5, 2, 3, 5, 7, 8, 9];
    const sum = 15000;
    useEffect(() => {
        const swiperContainer = swiperRef.current;

        Object.assign(swiperContainer, SLIDER_PARAMS);
        swiperContainer.initialize();
    }, []);

    return (
        <div display="flex">
            <div className={styles.statistic__container}>
                <swiper-container ref={swiperRef} init="false">
                    <swiper-slide class="yellow-slide">
                        <Graphics title={"Диаграмма расходов"} sum={sum} data={data} labels={labels} />
                    </swiper-slide>
                    <swiper-slide class="yellow-slide">
                        <Graphics title={"Диаграмма доходов"} sum={sum} data={data} labels={labels} />
                    </swiper-slide>
                </swiper-container>
            </div>
        </div>
    );
};

export default MySwiper;
