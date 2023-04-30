import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import Slide from "../../components/slide/slide";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
register();

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
        {
            label: "сумма",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1",
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Chart.js Pie Chart",
        },
    },
};

const MySwiper = () => {
    const swiperRef = useRef(null);

    useEffect(() => {
        const swiperContainer = swiperRef.current;
        const params = {
            navigation: true,
            pagination: true,
            injectStyles: [
                `
              .swiper-button-next,
              .swiper-button-prev {
                background-color: white;
                padding: 8px 16px;
                border-radius: 100%;
                border: 2px solid black;
                color: red;
              }
              .swiper-pagination-bullet{
                width: 40px;
                height: 40px;
                background-color: red;
              }
          `,
            ],
        };

        Object.assign(swiperContainer, params);
        swiperContainer.initialize();
    }, []);

    return (
        <swiper-container ref={swiperRef} init="false">
            <swiper-slide class="blue-slide">
                <Slide />
            </swiper-slide>
            <swiper-slide class="yellow-slide">
                <div style={{ width: "500px", height: "500px", marginLeft: "300px" }}>
                    <Pie data={data} />
                </div>
            </swiper-slide>
            <swiper-slide class="green-slide">Slide 3</swiper-slide>
        </swiper-container>
    );
};

export default MySwiper;
