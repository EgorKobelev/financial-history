import { createSlice } from "@reduxjs/toolkit";
import {
    getBalance,
    createBalance,
    getSumByTypes,
    getAllOperations,
    createOperation,
    updateOperation,
    deleteOperaion,
    getOperationsByTypeDynamically,
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

    statisticOperations: {
        income: [],
        expenses: [],
    },

    statisticExpensesInfo: {
        dates: null,
        page: 1,
    },

    statisticIncomeInfo: {
        dates: null,
        page: 1,
    },

    statistStatus: {
        isLoading: false,
        isFailedExpenses: false,
        isFailedIncome: false,
    },
};

const operationSlice = createSlice({
    name: "operationReducer",
    initialState,
    reducers: {
        clearStatisticOperations(state, action) {
            if (action.payload.type === "expenses") {
                state.statisticOperations.expenses = [];
                state.statisticExpensesInfo.dates = action.payload.dates;
                state.statisticExpensesInfo.page = 1;
            } else if (action.payload.type === "income") {
                state.statisticOperations.income = [];
                state.statisticIncomeInfo.dates = action.payload.dates;
                state.statisticIncomeInfo.page = 1;
            }
        },

        setStatisticPage(state, action) {
            if (action.payload === "expenses") {
                state.statisticExpensesInfo.page = state.statisticExpensesInfo.page + 1;
            } else if (action.payload === "income") {
                state.statisticIncomeInfo.page = state.statisticIncomeInfo.page + 1;
            }
        },

        clearErrors(state, action) {
            if (action.payload === "expenses") {
                state.statistStatus.isFailedExpenses = false;
            } else if (action.payload === "income") {
                state.statistStatus.isFailedIncome = false;
            }
        },
    },
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
            .addCase(getOperationsByTypeDynamically.pending, (state) => {
                state.statistStatus.isLoading = true;
            })
            .addCase(getOperationsByTypeDynamically.fulfilled, (state, action) => {
                state.statistStatus.isLoading = false;
                if (action.payload.type === "expenses") {
                    state.statisticOperations.expenses = [...state.statisticOperations.expenses, ...action.payload.operations.reverse()];
                } else if (action.payload.type === "income") {
                    state.statisticOperations.income = [...state.statisticOperations.income, ...action.payload.operations.reverse()];
                }
            })
            .addCase(getOperationsByTypeDynamically.rejected, (state, action) => {
                state.statistStatus.isLoading = false;
                if (action.payload.type === "expenses") {
                    state.statistStatus.isFailedExpenses = true;
                } else if (action.payload.type === "income") {
                    state.statistStatus.isFailedIncome = true;
                }
            })
            .addCase(createBalance.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(createBalance.fulfilled, (state, action) => {
                state.sum.balance = parseInt(action.payload);
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
            .addCase(getAllOperations.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(getAllOperations.fulfilled, (state, action) => {
                state.lastOperations = action.payload;
                state.status.isLoading = false;
            })
            .addCase(getAllOperations.rejected, (state) => {
                state.status.isFailed = true;
                state.status.isLoading = false;
            })
            .addCase(createOperation.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(createOperation.fulfilled, (state) => {
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
                if (action.payload.isStatistic) {
                    const indexExpenses = state.statisticOperations.expenses.findIndex((element) => {
                        return element.id === action.payload.form.id;
                    });
                    const indexIncome = state.statisticOperations.income.findIndex((element) => element.id === action.payload.form.id);
                    if (indexExpenses > indexIncome) {
                        state.statisticOperations.expenses[indexExpenses] = {
                            ...action.payload.form,
                            nameCategory: state.statisticOperations.expenses[indexExpenses].nameCategory,
                        };
                    } else {
                        state.statisticOperations.income[indexIncome] = action.payload.form;
                    }
                }
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
                if (action.payload.isStatistic) {
                    state.statisticOperations.expenses = state.statisticOperations.expenses.filter((element) => element.id !== action.payload.id);
                    state.statisticOperations.income = state.statisticOperations.income.filter((element) => element.id !== action.payload.id);
                } else {
                    state.lastOperations.expenses = state.lastOperations.expenses.filter((element) => element !== action.payload.id);
                    state.lastOperations.income = state.lastOperations.income.filter((element) => element !== action.payload.id);
                }
                state.status.isLoading = false;
            })
            .addCase(deleteOperaion.rejected, (state) => {
                state.status.isFailed = true;
                state.status.isLoading = false;
            });
    },
});

export const { clearErrors, clearStatisticOperations, setStatisticPage } = operationSlice.actions;

export default operationSlice.reducer;
