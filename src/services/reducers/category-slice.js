import { createSlice } from "@reduxjs/toolkit";
import { createCategory, getAllCategories, deleteCategory, getImages, updateCategory, getFromToCategories } from "../actions/category";

const initialState = {
    expenses: [],
    income: [],
    images: [],

    status: {
        isLoading: false,
        isFailed: false,
    },

    statisticExpenses: [],
    statisticIncome: [],
    statisticStatus: {
        isLoading: false,
        isFailed: false,
    },
};

const categorySlice = createSlice({
    name: "categoryReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.expenses = action.payload.listExpenses;
                state.income = action.payload.listIncome;
                state.status.isLoading = false;
            })
            .addCase(getAllCategories.rejected, (state) => {
                state.status.isFailed = true;
                state.status.isLoading = false;
            })
            .addCase(getImages.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(getImages.fulfilled, (state, action) => {
                state.images = action.payload;
                state.status.isLoading = false;
            })
            .addCase(getImages.rejected, (state) => {
                state.status.isFailed = true;
                state.status.isLoading = false;
            })
            .addCase(updateCategory.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(updateCategory.fulfilled, (state) => {
                state.status.isLoading = false;
            })
            .addCase(updateCategory.rejected, (state) => {
                state.status.isFailed = true;
                state.status.isLoading = false;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(deleteCategory.fulfilled, (state) => {
                state.status.isLoading = false;
            })
            .addCase(deleteCategory.rejected, (state) => {
                state.status.isFailed = true;
                state.status.isLoading = false;
            })
            .addCase(getFromToCategories.pending, (state) => {
                state.statisticStatus.isLoading = true;
            })
            .addCase(getFromToCategories.fulfilled, (state, action) => {
                if (action.payload.type === "expenses") {
                    state.statisticExpenses = action.payload.categories;
                } else {
                    state.statisticIncome = action.payload.categories;
                }
                state.statisticStatus.isLoading = false;
            })
            .addCase(getFromToCategories.rejected, (state) => {
                state.statisticStatus.isFailed = true;
                state.statisticStatus.isLoading = false;
            })
            .addCase(createCategory.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                if (action.payload.type === "expenses") {
                    state.expenses = [...state.expenses, action.payload];
                } else {
                    state.income = [...state.income, action.payload];
                }
                state.status.isLoading = false;
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.status.isFailed = true;
                state.status.isLoading = false;
            });
    },
});

export default categorySlice.reducer;
