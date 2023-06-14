import React from "react";
import styles from "./main-page.module.css";
import Finance from "../../components/finance/finance";
import Categories from "../../components/categories/categories";
import Operations from "../../components/operations/operations";
import { register } from "swiper/element/bundle";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, getImages } from "../../services/actions/category";
import { getAllOperations, getBalance, getSumByTypes } from "../../services/actions/operation";
import { SLIDER_PARAMS } from "../../utils/constants";

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
        dispatch(getImages());
        dispatch(getBalance());
        dispatch(getSumByTypes({ type: "expenses", dateTime: date }));
        dispatch(getSumByTypes({ type: "income", dateTime: date }));
        dispatch(getAllOperations({ dateTime: date, count: 5 }));
        const swiperContainer = swiperRef.current;

        Object.assign(swiperContainer, SLIDER_PARAMS);
        swiperContainer.initialize();
    }, []);
    return (
        <div className="flex">
            <div className={styles.main_page__container}>
                <Finance />
                <swiper-container speed="500" space-between={30} ref={swiperRef} init="false">
                    <swiper-slide>
                        <Categories data={expenses} title={"Категории расходов"} />
                    </swiper-slide>
                    <swiper-slide>
                        <Categories data={income} title={"Категории доходов"} />
                    </swiper-slide>
                </swiper-container>
            </div>
            <div className={styles.main_page__operations}>
                {lastOperations.income.length > 0 && (
                    <Operations subtitle={"* Последние 5 операций за месяц"} title="Доходы" type="income" data={lastOperations.income} />
                )}
                {lastOperations.expenses.length > 0 && (
                    <Operations subtitle={"* Последние 5 операций за месяц"} title="Расходы" type="expenses" data={lastOperations.expenses} />
                )}
            </div>
        </div>
    );
};

export default MainPage;
