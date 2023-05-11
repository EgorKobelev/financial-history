import { createSlice } from "@reduxjs/toolkit";
import {
    getBalance,
    createBalance,
    getSumByTypes,
    getLastFiveOperationsBothTypeAsync,
    createOperation,
    updateOperation,
    deleteOperaion,
} from "../actions/operation";

const initialState = {
    sum: {
        expenses: 0,
        income: 0,
        balance: 0,
    },

    lastOperations: {
        income: [],
        expenses: [],
    },

    status: {
        isLoading: false,
        isFailed: false,
    },
};

const operationSlice = createSlice({
    name: "operationReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBalance.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(getBalance.fulfilled, (state, action) => {
                state.status.isLoading = false;
                state.sum.balance = action.payload.balance;
            })
            .addCase(getBalance.rejected, (state) => {
                state.status.isFailed = true;
                state.status.isLoading = false;
            })
            .addCase(createBalance.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(createBalance.fulfilled, (state, action) => {
                state.sum.balance = action.payload;
                state.status.isLoading = false;
            })
            .addCase(createBalance.rejected, (state) => {
                state.status.isFailed = true;
                state.status.isLoading = false;
            })
            .addCase(getSumByTypes.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(getSumByTypes.fulfilled, (state, action) => {
                if (action.payload.type === "expenses") {
                    state.sum.expenses = action.payload.sum;
                } else {
                    state.sum.income = action.payload.sum;
                }
                state.status.isLoading = false;
            })
            .addCase(getSumByTypes.rejected, (state) => {
                state.status.isFailed = true;
                state.status.isLoading = false;
            })
            .addCase(getLastFiveOperationsBothTypeAsync.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(getLastFiveOperationsBothTypeAsync.fulfilled, (state, action) => {
                state.lastOperations = action.payload;
                state.status.isLoading = false;
            })
            .addCase(getLastFiveOperationsBothTypeAsync.rejected, (state) => {
                state.status.isFailed = true;
                state.status.isLoading = false;
            })
            .addCase(createOperation.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(createOperation.fulfilled, (state, action) => {
                state.status.isLoading = false;
            })
            .addCase(createOperation.rejected, (state) => {
                state.status.isFailed = true;
                state.status.isLoading = false;
            })
            .addCase(updateOperation.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(updateOperation.fulfilled, (state, action) => {
                state.status.isLoading = false;
            })
            .addCase(updateOperation.rejected, (state) => {
                state.status.isFailed = true;
                state.status.isLoading = false;
            })
            .addCase(deleteOperaion.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(deleteOperaion.fulfilled, (state, action) => {
                state.lastOperations.expenses = state.lastOperations.expenses.filter(
                    (element) => element !== action.payload
                );
                state.lastOperations.income = state.lastOperations.income.filter(
                    (element) => element !== action.payload
                );
                state.status.isLoading = false;
            })
            .addCase(deleteOperaion.rejected, (state) => {
                state.status.isFailed = true;
                state.status.isLoading = false;
            });
    },
});

export default operationSlice.reducer;
