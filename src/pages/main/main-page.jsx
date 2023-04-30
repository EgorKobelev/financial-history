import React from "react";
import styles from "./main-page.module.css";
import Finance from "../../components/finance/finance";
import Categories from "../../components/categories/categories";
import Operations from "../../components/operations/operations";
import { register } from "swiper/element/bundle";
import icon from "../../images/categories/circle.svg";
import { useDispatch } from "react-redux";
import { getAllCategories } from "../../services/actions/category";

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
    { title: "Связь" },
    { title: "Связь" },
];

const income = [{ title: "Аванс" }, { title: "Зарплата" }, { title: "Больничные" }];

const data = {
    income: income,
    expenses: expenses,
};

const income_operations = [
    { category: "Зарплата", money: 322231, date: "2023-03-21", image: icon },
    { category: "Больничные", money: 4300, date: "2023-03-21", image: icon },
];

const expenses_operations = [
    { category: "Продукты", money: 1231, date: "2023-03-21", image: icon },
    { category: "ЖКХ", money: 4300, date: "2023-03-21", image: icon },
    { category: "Подарки", money: 2000, date: "2023-03-21", image: icon },
    { category: "Спорт", money: 5990, date: "2023-03-21", image: icon },
    { category: "Путешествия", money: 5990, date: "2023-03-21", image: icon },
];

const data_operations = {
    income: income_operations,
    expenses: expenses_operations,
};

register();

const MainPage = () => {
    const dispatch = useDispatch();
    const swiperRef = React.useRef(null);
    // dispatch(getAllCategories());

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
                {data_operations && data_operations.income.length > 0 && (
                    <Operations title="Доходы" data={data_operations.income} />
                )}
                {data_operations && data_operations.expenses.length > 0 && (
                    <Operations title="Расходы" data={data_operations.expenses} />
                )}
            </div>
        </div>
    );
};

export default MainPage;
