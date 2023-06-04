export const TAB_WEEK = "неделя";
export const TAB_MONTH = "месяц";
export const TAB_ALL_TIME = "все время";
export const TAB_PERIOD = "период";
export const TAB_YEAR = "год";
export const COLORS = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(0, 216, 216, 1)",
    "rgba(9, 78, 255, 0.85)",
    "rgba(152,251,152, 1)",
    "rgba(241,156,187, 1)",
];

export const OPTIONS_CHART = {
    cutout: "75%",
    borderRadius: 4,
    borderWidth: 2,
    hoverBorderWidth: 5,
    plugins: {
        legend: {
            display: false,
        },
    },
    responsive: true,
};

export const SLIDER_PARAMS = {
    navigation: true,
    pagination: true,
    injectStyles: [
        `
      .swiper-button-next,
      .swiper-button-prev {
        color: black;
        width: 8px;
        background-position: center;
        background-size: 8px;
        background-repeat: no-repeat; 
      }

      .swiper-button-next:after,
      .swiper-button-prev:after {
        content: "";
      }

      .swiper-button-next {
        background-image: url("../../next.svg");
      }

      .swiper-button-prev {
        background-image: url("../../prev.svg");
      }
     
      .swiper-pagination-bullet{
        width: 8px;
        height: 8px;
        background-color: #A39797;
      }
  `,
    ],
};
