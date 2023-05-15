import React from "react";
import styles from "./main-page.module.css";
import Finance from "../../components/finance/finance";
import Categories from "../../components/categories/categories";
import Operations from "../../components/operations/operations";
import { register } from "swiper/element/bundle";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../services/actions/category";
import { getAllOperations, getBalance, getSumByTypes } from "../../services/actions/operation";

register();

const getExpenses = (store) => store.categoryReducer.expenses;
const getIncome = (store) => store.categoryReducer.income;
const getLastOperations = (store) => store.operationReducer.lastOperations;

const MainPage = () => {
    const dispatch = useDispatch();
    const swiperRef = React.useRef(null);
    const expenses = useSelector(getExpenses);
    const income = useSelector(getIncome);
    const lastOperations = useSelector(getLastOperations);
    React.useEffect(() => {
        const date = new Date().toISOString();
        dispatch(getAllCategories());
        dispatch(getBalance());
        dispatch(getSumByTypes({ type: "expenses", dateTime: date }));
        dispatch(getSumByTypes({ type: "income", dateTime: date }));
        dispatch(getAllOperations({ dateTime: date, quantity: 5 }));
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
                        <Categories data={expenses} title={"Категории расходов"} />
                    </swiper-slide>
                    <swiper-slide class="blue-slide">
                        <Categories data={income} title={"Категории доходов"} />
                    </swiper-slide>
                </swiper-container>
            </div>
            <div className={styles.main_page__operations}>
                {lastOperations.income.length > 0 && <Operations title="Доходы" data={lastOperations.income} />}
                {lastOperations.expenses.length > 0 && <Operations title="Расходы" data={lastOperations.expenses} />}
            </div>
        </div>
    );
};

export default MainPage;
