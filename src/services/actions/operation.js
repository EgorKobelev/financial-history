import { createAsyncThunk } from "@reduxjs/toolkit";
import { OperationService } from "../../utils/operation-service";
import { getAllCategories } from "./category";

export const createBalance = createAsyncThunk(
    "opearationReducer/createBalance",
    async function (newBalance, { rejectWithValue }) {
        try {
            await OperationService.createBalance(newBalance);
            return newBalance;
        } catch (e) {
            return rejectWithValue("Не удалось создать баланс");
        }
    }
);

export const getBalance = createAsyncThunk("opearationReducer/getBalance", async function (args, { rejectWithValue }) {
    try {
        const { data } = await OperationService.getBalance();
        return data;
    } catch (e) {
        return rejectWithValue("Не удалось получить баланс");
    }
});

export const getSumByTypes = createAsyncThunk(
    "opearationReducer/getSumByTypes",
    async function (form, { rejectWithValue }) {
        try {
            const { data } = await OperationService.getSumByType(form);
            return { type: form.type, sum: data.sum };
        } catch (e) {
            return rejectWithValue("Не удалось получить доходы и расходы");
        }
    }
);

export const getAllOperations = createAsyncThunk(
    "opearationReducer/getLastFiveOperationsBothTypeAsync",
    async function (form, { rejectWithValue }) {
        try {
            const { data } = await OperationService.getOperationsByType(form);

            return {
                expenses: data.operationsExpenses.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)),
                income: data.operationsIncome.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)),
            };
        } catch (e) {
            return rejectWithValue("Не удалось получить операции");
        }
    }
);

export const createOperation = createAsyncThunk(
    "opearationReducer/createOperation",
    async function (form, { rejectWithValue, dispatch }) {
        try {
            await OperationService.createOperaion(form);
            const date = new Date().toISOString();
            dispatch(getAllCategories());
            dispatch(getBalance());
            dispatch(getSumByTypes({ type: "expenses", dateTime: date }));
            dispatch(getSumByTypes({ type: "income", dateTime: date }));
            dispatch(getAllOperations({ dateTime: date, quantity: 5 }));
            return;
        } catch (e) {
            return rejectWithValue("Не удалось создать операцию");
        }
    }
);

export const updateOperation = createAsyncThunk(
    "opearationReducer/updateOperation",
    async function (form, { rejectWithValue, dispatch }) {
        try {
            const { data } = await OperationService.updateOperaion(form);
            const date = new Date().toISOString();
            dispatch(getAllCategories());
            dispatch(getBalance());
            dispatch(getSumByTypes({ type: "expenses", dateTime: date }));
            dispatch(getSumByTypes({ type: "income", dateTime: date }));
            dispatch(getAllOperations({ dateTime: date, quantity: 5 }));

            return data;
        } catch (e) {
            return rejectWithValue("Не удалось обновить операцию");
        }
    }
);

export const deleteOperaion = createAsyncThunk(
    "opearationReducer/deleteOperation",
    async function (id, { rejectWithValue, dispatch }) {
        try {
            await OperationService.deleteOperaion(id);
            const date = new Date().toISOString();
            dispatch(getAllCategories());
            dispatch(getBalance());
            dispatch(getSumByTypes({ type: "expenses", dateTime: date }));
            dispatch(getSumByTypes({ type: "income", dateTime: date }));
            dispatch(getAllOperations({ dateTime: date, quantity: 5 }));

            return id;
        } catch (e) {
            return rejectWithValue("Не удалось удалить операцию");
        }
    }
);
