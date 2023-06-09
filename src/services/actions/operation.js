import { createAsyncThunk } from "@reduxjs/toolkit";
import { OperationService } from "../../utils/operation-service";
import { getAllCategories } from "./category";
import { toast } from "react-toastify";

export const createBalance = createAsyncThunk("opearationReducer/createBalance", async function (newBalance, { rejectWithValue }) {
    try {
        await OperationService.createBalance(newBalance);
        toast.success("Баланс обновлен", { autoClose: 3000 });
        return newBalance;
    } catch (e) {
        toast.error("Не удалось обновить баланс", { autoClose: 3000 });
        return rejectWithValue("Не удалось создать баланс");
    }
});

export const getBalance = createAsyncThunk("opearationReducer/getBalance", async function (args, { rejectWithValue }) {
    try {
        const { data } = await OperationService.getBalance();
        return data;
    } catch (e) {
        return rejectWithValue("Не удалось получить баланс");
    }
});

export const getSumByTypes = createAsyncThunk("opearationReducer/getSumByTypes", async function (form, { rejectWithValue }) {
    try {
        const { data } = await OperationService.getSumByType(form);
        return { type: form.type, sum: data.sum };
    } catch (e) {
        return rejectWithValue("Не удалось получить доходы и расходы");
    }
});

export const getOperationsByTypeDynamically = createAsyncThunk(
    "opearationReducer/getOperationsByTypeDynamically",
    async function (type, { getState, rejectWithValue }) {
        try {
            const store = getState();
            const isFailed = type === "expenses" ? store.operationReducer.statistStatus.isFailedExpenses : store.operationReducer.statistStatus.isFailedIncome;
            const dates = type === "expenses" ? store.operationReducer.statisticExpensesInfo.dates : store.operationReducer.statisticIncomeInfo.dates;
            const page = type === "expenses" ? store.operationReducer.statisticExpensesInfo.page : store.operationReducer.statisticIncomeInfo.page;
            const { data } = !isFailed ? await OperationService.getOperationsByTypeDynamically({ type, to: dates.to, from: dates.from, page }) : null;
            return { type, operations: data.operations || [] };
        } catch (e) {
            return rejectWithValue({ type });
        }
    }
);

export const getAllOperations = createAsyncThunk("opearationReducer/getLastFiveOperationsBothTypeAsync", async function (form, { rejectWithValue }) {
    try {
        const { data } = await OperationService.getOperationsByType(form);

        return {
            expenses: data.operationsExpenses.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)),
            income: data.operationsIncome.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)),
        };
    } catch (e) {
        return rejectWithValue("Не удалось получить операции");
    }
});

export const createOperation = createAsyncThunk("opearationReducer/createOperation", async function (form, { rejectWithValue, dispatch }) {
    try {
        await OperationService.createOperaion(form);
        const date = new Date().toISOString();
        dispatch(getAllCategories());
        dispatch(getBalance());
        dispatch(getSumByTypes({ type: "expenses", dateTime: date }));
        dispatch(getSumByTypes({ type: "income", dateTime: date }));
        dispatch(getAllOperations({ dateTime: date, count: 5 }));
        toast.success("Операция добавлена", { autoClose: 3000 });
        return;
    } catch (e) {
        toast.error("Операция добавлена", { autoClose: 3000 });
        return rejectWithValue("Не удалось создать операцию");
    }
});

export const updateOperation = createAsyncThunk("opearationReducer/updateOperation", async function (info, { rejectWithValue, dispatch }) {
    try {
        await OperationService.updateOperaion(info.form);
        toast.success("Операция обновлена", { autoClose: 3000 });
        if (info.isStatistic) {
            return info;
        }
        const date = new Date().toISOString();
        dispatch(getAllCategories());
        dispatch(getBalance());
        dispatch(getSumByTypes({ type: "expenses", dateTime: date }));
        dispatch(getSumByTypes({ type: "income", dateTime: date }));
        dispatch(getAllOperations({ dateTime: date, count: 5 }));
        return info;
    } catch (e) {
        toast.error("Операция обновлена", { autoClose: 3000 });
        return rejectWithValue("Не удалось обновить операцию");
    }
});

export const deleteOperaion = createAsyncThunk("opearationReducer/deleteOperation", async function (form, { rejectWithValue, dispatch }) {
    try {
        await OperationService.deleteOperaion(form.id);
        toast.success("Операция удалена", { autoClose: 3000 });
        if (form.isStatistic) {
            return { id: form.id, isStatistic: form.isStatistic };
        }
        const date = new Date().toISOString();
        dispatch(getAllCategories());
        dispatch(getBalance());
        dispatch(getSumByTypes({ type: "expenses", dateTime: date }));
        dispatch(getSumByTypes({ type: "income", dateTime: date }));
        dispatch(getAllOperations({ dateTime: date, count: 5 }));
        return { id: form.id };
    } catch (e) {
        toast.error("Не удалось удалить операцию", { autoClose: 3000 });
        return rejectWithValue("Не удалось удалить операцию");
    }
});
