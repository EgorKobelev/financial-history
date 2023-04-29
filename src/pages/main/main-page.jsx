import React from "react";
import styles from "./main-page.module.css";
import Finance from "../../components/finance/finance";
import Categories from "../../components/categories/categories";
import Operations from "../../components/operations/operations";
import { register } from "swiper/element/bundle";

const expenses = [
    { title: "Продукты" },
    { title: "Развлечения" },
    { title: "Еда вне дома" },
    { title: "Транспорт" },
    { title: "Образование" },
    { title: "Спорт" },
    { title: "Подарки" },
    { title: "Здоровье" },
    { title: "Покупки" },
    { title: "ЖКХ" },
    { title: "Связь" },
];

const income = [{ title: "Аванс" }, { title: "Зарплата" }, { title: "Больничные" }];

const data = {
    income: income,
    expenses: expenses,
};

register();

const MainPage = () => {
    const swiperRef = React.useRef(null);

    React.useEffect(() => {
        const swiperContainer = swiperRef.current;
        const params = {
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

        Object.assign(swiperContainer, params);
        swiperContainer.initialize();
    }, []);
    return (
        <div className="flex">
            <div className={styles.main_page__container}>
                <Finance />
                <swiper-container space-between={30} ref={swiperRef} init="false">
                    <swiper-slide class="yellow-slide">
                        <Categories data={data.expenses} title={"Категории расходов"} />
                    </swiper-slide>
                    <swiper-slide class="blue-slide">
                        <Categories data={data.income} title={"Категории доходов"} />
                    </swiper-slide>
                </swiper-container>
            </div>
            <div className={styles.main_page__operations}>
                <Operations />
            </div>
        </div>
    );
};

export default MainPage;
