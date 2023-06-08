import { useEffect, useRef, useState } from "react";
import { register } from "swiper/element/bundle";
import styles from "./statistic-page.module.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Graphics from "../../components/graphics/graphics";
import { SLIDER_PARAMS } from "../../utils/constants";
import { TAB_WEEK } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { getAllCategories, getFromToCategories, getImages } from "../../services/actions/category";
import { useSelector } from "react-redux";
import Operations from "../../components/operations/operations";
import { getBalance, getOperationsByTypeDynamically } from "../../services/actions/operation";
import { clearErrors, clearStatisticOperations, setStatisticPage } from "../../services/reducers/operation-slice";
register();

ChartJS.register(ArcElement, Tooltip, Legend);

const getIncome = (store) => store.categoryReducer.statisticIncome;
const getExpenses = (store) => store.categoryReducer.statisticExpenses;
const getIsLoadingCategory = (store) => store.categoryReducer.statisticStatus.isLoading;
const getOperations = (store) => store.operationReducer.statisticOperations;
const getExpensesDates = (store) => store.operationReducer.statisticExpensesInfo.dates;
const getIncomeDates = (store) => store.operationReducer.statisticIncomeInfo.dates;
const getIsLoadingOperations = (store) => store.operationReducer.statistStatus.isLoading;

const timeouts = [];

const MySwiper = () => {
    const swiperRef = useRef(null);
    const dispatch = useDispatch();
    const [activeTabExpenses, setActiveTabsExpenses] = useState(TAB_WEEK);
    const [expensesCategoriesData, setExpensesCategoriesData] = useState({ labels: [], data: [], sum: 0 });
    const [activeTabIncome, setActiveTabsIncome] = useState(TAB_WEEK);
    const [incomeCategoriesData, setIncomeCategoriesData] = useState({ labels: [], data: [], sum: 0 });
    const isLoadingCategory = useSelector(getIsLoadingCategory);
    const [isNotShowLoaderAfterDelay, setIsNotShowLoaderAfterDelay] = useState(false);

    const [activeSlide, setActiveSlide] = useState(0);

    const operations = useSelector(getOperations);
    const datesExpenses = useSelector(getExpensesDates);
    const datesIncome = useSelector(getIncomeDates);

    const income = useSelector(getIncome);
    const expenses = useSelector(getExpenses);
    const isLoadingOperations = useSelector(getIsLoadingOperations);

    const [isToggleOperationOpacity, setIsToggleOperationOpacity] = useState(false);

    const getNewOperations = (type) => {
        dispatch(getOperationsByTypeDynamically(type));
        dispatch(setStatisticPage(type));
    };
    useEffect(() => {
        if (!isLoadingOperations && operations) {
            while (timeouts.length > 0) {
                clearTimeout(timeouts.pop());
            }
            timeouts.push([setTimeout(() => setIsToggleOperationOpacity(true), 200)]);
        }
        return () => {
            while (timeouts.length > 0) {
                clearTimeout(timeouts.pop());
            }
        };
    }, [isLoadingOperations]);

    useEffect(() => {
        getNewOperations("expenses");
    }, [datesExpenses]);

    useEffect(() => {
        getNewOperations("income");
    }, [datesIncome]);

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
        setIsToggleOperationOpacity(false);
        setIsNotShowLoaderAfterDelay(false);
        if (type === "expenses") {
            setActiveTabsExpenses(tab);
        } else if (type === "income") {
            setActiveTabsIncome(tab);
        }
        dispatch(clearErrors(type));
        dispatch(
            clearStatisticOperations({
                type: type,
                dates: {
                    from: fromDate,
                    to: toDate,
                },
            })
        );
        const form = {
            type,
            fromDate,
            toDate,
        };
        dispatch(getFromToCategories(form));
    };

    useEffect(() => {
        dispatch(getAllCategories());
        dispatch(getImages());
        dispatch(getBalance());
        const swiperContainer = swiperRef.current;

        Object.assign(swiperContainer, SLIDER_PARAMS);
        swiperContainer.initialize();
        swiperContainer.addEventListener("slidechange", (event) => {
            setActiveSlide({ ...event.detail }["0"].activeIndex || 0);
        });
    }, []);

    return (
        <div className={styles.global}>
            <div className={styles.statistic__container}>
                <swiper-container style={{ height: "100%" }} speed="500" space-between={30} ref={swiperRef} init="false">
                    <swiper-slide style={{ height: "100%" }}>
                        <Graphics
                            handleGetData={handleGetData}
                            type="expenses"
                            setActiveTabs={setActiveTabsExpenses}
                            activeTab={activeTabExpenses}
                            title={"Диаграмма расходов"}
                            sum={expensesCategoriesData.sum}
                            data={expensesCategoriesData.data}
                            labels={expensesCategoriesData.labels}
                            isLoading={isLoadingCategory}
                            isNotShowLoaderAfterDelay={isNotShowLoaderAfterDelay}
                            setIsNotShowLoaderAfterDelay={setIsNotShowLoaderAfterDelay}
                        />
                    </swiper-slide>
                    <swiper-slide style={{ height: "100%" }}>
                        <Graphics
                            handleGetData={handleGetData}
                            type="income"
                            setActiveTabs={setActiveTabsIncome}
                            activeTab={activeTabIncome}
                            title={"Диаграмма доходов"}
                            sum={incomeCategoriesData.sum}
                            data={incomeCategoriesData.data}
                            labels={incomeCategoriesData.labels}
                            isLoading={isLoadingCategory}
                            isNotShowLoaderAfterDelay={isNotShowLoaderAfterDelay}
                            setIsNotShowLoaderAfterDelay={setIsNotShowLoaderAfterDelay}
                        />
                    </swiper-slide>
                </swiper-container>
            </div>
            <div
                className={styles.operations__container}
                style={{
                    opacity: isToggleOperationOpacity ? 1 : 0,
                    display:
                        isLoadingOperations && ((activeSlide === 0 && operations.expenses.length === 0) || (operations.expenses.length && activeSlide === 1))
                            ? "none"
                            : "block",
                }}
            >
                {activeSlide === 0
                    ? operations.expenses.length > 0 &&
                      expensesCategoriesData.data.length > 0 && (
                          <Operations data={operations.expenses} getNewOperations={getNewOperations} title="Расходы" type={"expenses"} />
                      )
                    : operations.income.length > 0 &&
                      incomeCategoriesData.data.length > 0 && (
                          <Operations data={operations.income} getNewOperations={getNewOperations} title="Доходы" type={"income"} />
                      )}
            </div>
        </div>
    );
};

export default MySwiper;
