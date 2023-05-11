import { createAsyncThunk } from "@reduxjs/toolkit";
import { OperationService } from "../../utils/operation-service";
import { getAllCategories } from "./category";

export const createBalance = createAsyncThunk(
    "opearationReducer/createBalance",
    async function (newBalance, { rejectWithValue, dispatch }) {
        try {
            await OperationService.createBalance(newBalance);
            return newBalance;
        } catch (e) {
            return rejectWithValue("Не удалось создать баланс");
        }
    }
);

export const getBalance = createAsyncThunk(
    "opearationReducer/getBalance",
    async function (args, { rejectWithValue, dispatch }) {
        try {
            const { data } = await OperationService.getBalance();
            return data;
        } catch (e) {
            return rejectWithValue("Не удалось получить баланс");
        }
    }
);

export const getSumByTypes = createAsyncThunk(
    "opearationReducer/getSumByTypes",
    async function (type, { rejectWithValue, dispatch }) {
        try {
            const { data } = await OperationService.getSumByType(type);
            return { type: type, sum: data.sum };
        } catch (e) {
            return rejectWithValue("Не удалось получить доходы и расходы");
        }
    }
);

export const getLastFiveOperationsBothTypeAsync = createAsyncThunk(
    "opearationReducer/getLastFiveOperationsBothTypeAsync",
    async function (args, { rejectWithValue, dispatch }) {
        try {
            const { data } = await OperationService.getLastFiveOperationsBothTypeAsync();

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
            const { data } = await OperationService.createOperaion(form);
            dispatch(getAllCategories());
            dispatch(getBalance());
            dispatch(getSumByTypes("expenses"));
            dispatch(getSumByTypes("income"));
            dispatch(getLastFiveOperationsBothTypeAsync());
            return data;
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
            dispatch(getAllCategories());
            dispatch(getBalance());
            dispatch(getSumByTypes("expenses"));
            dispatch(getSumByTypes("income"));
            dispatch(getLastFiveOperationsBothTypeAsync());
            return data;
        } catch (e) {
            return rejectWithValue("Не удалось обновить операцию");
        }
    }
);

export const deleteOperaion = createAsyncThunk(
    "opearationReducer/deleteOperation",
    async function (form, { rejectWithValue, dispatch }) {
        try {
            await OperationService.deleteOperaion(form);
            dispatch(getAllCategories());
            dispatch(getBalance());
            dispatch(getSumByTypes("expenses"));
            dispatch(getSumByTypes("income"));
            dispatch(getLastFiveOperationsBothTypeAsync());
            return form.id;
        } catch (e) {
            return rejectWithValue("Не удалось удалить операцию");
        }
    }
);
