import { useEffect, useRef, useState } from "react";
import { register } from "swiper/element/bundle";
import styles from "./statistic-page.module.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Graphics from "../../components/graphics/graphics";
import { SLIDER_PARAMS } from "../../utils/constants";
import { TAB_WEEK, TAB_ALL_TIME, TAB_MONTH, TAB_PERIOD, TAB_YEAR } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { getFromToCategories } from "../../services/actions/category";
import { useSelector } from "react-redux";
register();

ChartJS.register(ArcElement, Tooltip, Legend);

const getIncome = (store) => store.categoryReducer.statisticIncome;
const getExpenses = (store) => store.categoryReducer.statisticExpenses;
const getIsLoading = (store) => store.categoryReducer.statisticStatus.isLoading;

const MySwiper = () => {
    const swiperRef = useRef(null);
    const dispatch = useDispatch();
    const [activeTabExpenses, setActiveTabsExpenses] = useState(TAB_WEEK);
    const [expensesCategoriesData, setExpensesCategoriesData] = useState({ labels: [], data: [], sum: 0 });
    const [activeTabIncome, setActiveTabsIncome] = useState(TAB_WEEK);
    const [incomeCategoriesData, setIncomeCategoriesData] = useState({ labels: [], data: [], sum: 0 });
    const isLoading = useSelector(getIsLoading);
    const [isNotShowLoaderAfterDelay, setIsNotShowLoaderAfterDelay] = useState(false);

    const income = useSelector(getIncome);
    const expenses = useSelector(getExpenses);

    useEffect(() => {
        if (expenses.length > 0) {
            const info = { labels: [], data: [], sum: 0 };
            const sortedExpenses = [...expenses];
            sortedExpenses.sort((a, b) => b.sum - a.sum);
            sortedExpenses.slice(0, 9).forEach((category) => {
                if (category.sum !== 0) {
                    info.data.push(category.sum);
                    info.labels.push(category.name);
                    info.sum += category.sum;
                }
            });
            const lastItem = sortedExpenses.slice(9, sortedExpenses.length).reduce((acc, current) => acc + current.sum, 0);
            if (lastItem !== 0) {
                info.data.push(lastItem);
                info.labels.push("Оставшиеся");
                info.sum += lastItem;
            }
            setExpensesCategoriesData(info);
        }
    }, [expenses]);

    useEffect(() => {
        if (income.length > 0) {
            const info = { labels: [], data: [], sum: 0 };
            const sortedIncome = [...income];
            sortedIncome.sort((a, b) => b.sum - a.sum);
            sortedIncome.slice(0, 9).forEach((category) => {
                if (category.sum !== 0) {
                    info.data.push(category.sum);
                    info.labels.push(category.name);
                    info.sum += category.sum;
                }
            });
            const lastItem = sortedIncome.slice(9, sortedIncome.length).reduce((acc, current) => acc + current.sum, 0);
            if (lastItem !== 0) {
                info.data.push(lastItem);
                info.labels.push("Оставшиеся");
                info.sum += lastItem;
            }
            setIncomeCategoriesData(info);
        }
    }, [income]);

    const handleGetData = (tab, fromDate, toDate, type) => {
        setIsNotShowLoaderAfterDelay(false);
        if (type === "expenses") {
            setActiveTabsExpenses(tab);
        } else if (type === "income") {
            setActiveTabsIncome(tab);
        }
        const form = {
            type,
            fromDate,
            toDate,
        };
        dispatch(getFromToCategories(form));
    };

    useEffect(() => {
        const swiperContainer = swiperRef.current;

        Object.assign(swiperContainer, SLIDER_PARAMS);
        swiperContainer.initialize();
    }, []);
    return (
        <div display="flex">
            <div className={styles.statistic__container}>
                <swiper-container ref={swiperRef} init="false">
                    <swiper-slide>
                        <Graphics
                            handleGetData={handleGetData}
                            type="expenses"
                            setActiveTabs={setActiveTabsExpenses}
                            activeTab={activeTabExpenses}
                            title={"Диаграмма расходов"}
                            sum={expensesCategoriesData.sum}
                            data={expensesCategoriesData.data}
                            labels={expensesCategoriesData.labels}
                            isLoading={isLoading}
                            isNotShowLoaderAfterDelay={isNotShowLoaderAfterDelay}
                            setIsNotShowLoaderAfterDelay={setIsNotShowLoaderAfterDelay}
                        />
                    </swiper-slide>
                    <swiper-slide>
                        <Graphics
                            handleGetData={handleGetData}
                            type="income"
                            setActiveTabs={setActiveTabsIncome}
                            activeTab={activeTabIncome}
                            title={"Диаграмма доходов"}
                            sum={incomeCategoriesData.sum}
                            data={incomeCategoriesData.data}
                            labels={incomeCategoriesData.labels}
                            isLoading={isLoading}
                            isNotShowLoaderAfterDelay={isNotShowLoaderAfterDelay}
                            setIsNotShowLoaderAfterDelay={setIsNotShowLoaderAfterDelay}
                        />
                    </swiper-slide>
                </swiper-container>
            </div>
        </div>
    );
};

export default MySwiper;
