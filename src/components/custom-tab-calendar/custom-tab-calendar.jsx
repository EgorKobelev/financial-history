import styles from "./custom.tab-calendar.module.css";
import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import calendarImage from "../../images/calendar.svg";
import { ReactComponent as ClearButton } from "../../images/close.svg";

const CustomTabCalender = ({ tab, type, handleGetData, setActiveCalendar }) => {
    const [isShowImages, setIsShowImages] = useState({
        first: true,
        second: true,
    });

    const { values, handleChange, setValues } = useForm({
        firstDate: null,
        secondDate: null,
    });
    useEffect(() => {
        if (values.firstDate && values.secondDate) {
            const fromDate = new Date(values.firstDate).toISOString();
            if (fromDate <= new Date(values.secondDate).toISOString()) {
                const toDate = new Date(values.secondDate);
                toDate.setDate(toDate.getDate() + 1);
                handleGetData(tab, fromDate, toDate.toISOString(), type);
                setActiveCalendar(false);
            }
        }
    }, [values.firstDate, values.secondDate]);
    return (
        <div className={styles.tab__period_container}>
            <input
                id="stitistic-input--1"
                name="firstDate"
                type="text"
                placeholder="С какого"
                max={`${new Date().toISOString().substr(0, 10)}`}
                onFocus={() => {
                    const input = document.getElementById("stitistic-input--1");
                    input.type = "date";
                    setIsShowImages({ ...isShowImages, first: true });
                    input.click();
                    if (input) {
                        input.showPicker();
                    }
                }}
                onBlur={(e) => {
                    const input = document.getElementById("stitistic-input--1");
                    input.type = "text";
                    if (values.firstDate || (e.target.value && !values.firstDate)) {
                        setIsShowImages({ ...isShowImages, first: false });
                    }
                }}
                onChange={(e) => {
                    handleChange(e);
                    // const input = document.getElementById("stitistic-input--1");
                    // input.type = "text";
                    // input.blur();
                }}
                className={styles.tab__period_input}
            />
            {isShowImages.first && (
                <img
                    onClick={() => {
                        document.getElementById("stitistic-input--1").focus();
                    }}
                    className={styles.tab__calendar_first}
                    src={calendarImage}
                    alt="Календарь"
                />
            )}
            {!isShowImages.first && (
                <ClearButton
                    onClick={() => {
                        setIsShowImages({ ...isShowImages, first: true });
                        setValues({ ...values, firstDate: null });
                        document.getElementById("stitistic-input--1").value = "";
                    }}
                    className={styles.tab__close_first}
                />
            )}

            <input
                name="secondDate"
                onChange={(e) => {
                    handleChange(e);
                    // const input = document.getElementById("stitistic-input--2");
                    // input.type = "text";
                    // input.blur();
                }}
                id="stitistic-input--2"
                type="text"
                placeholder="По какое"
                max={`${new Date().toISOString().substr(0, 10)}`}
                onFocus={() => {
                    const input = document.getElementById("stitistic-input--2");
                    input.type = "date";
                    setIsShowImages({ ...isShowImages, second: true });
                    input.click();
                    if (input) {
                        input.showPicker();
                    }
                }}
                onBlur={(e) => {
                    const input = document.getElementById("stitistic-input--2");
                    input.type = "text";
                    if (values.secondDate || (e.target.value && !values.secondDate)) {
                        setIsShowImages({ ...isShowImages, second: false });
                    }
                }}
                className={styles.tab__period_input}
            />
            {isShowImages.second && (
                <img
                    onClick={() => {
                        document.getElementById("stitistic-input--2").focus();
                    }}
                    className={styles.tab__calendar_second}
                    src={calendarImage}
                    alt="Календарь"
                />
            )}
            {!isShowImages.second && (
                <ClearButton
                    onClick={() => {
                        setIsShowImages({ ...isShowImages, second: true });
                        setValues({ ...values, secondDate: null });
                        document.getElementById("stitistic-input--2").value = "";
                    }}
                    className={styles.tab__close_second}
                />
            )}
        </div>
    );
};

export default CustomTabCalender;
