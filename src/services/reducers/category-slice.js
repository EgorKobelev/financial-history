import { createSlice } from "@reduxjs/toolkit";
import { createCategory, getAllCategories, deleteCategory } from "../actions/category";

const initialState = {
    expenses: null,
    income: null,

    status: {
        isLoading: false,
        isFailed: false,
    },
};

const categorySlice = createSlice({
    name: "categoryReducer",
    initialState,
    reducers: {},
    extraReducer: (builder) => {
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.expenses = action.payload.expenses;
                state.income = action.payload.income;
                state.status.isLoading = false;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.status.isFailed = true;
                state.status.isLoading = false;
            })
            .addCase(createCategory.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.expenses = [...state.expenses, action.payload.expenses];
                state.income = [...state.income, action.payload.income];
                state.status.isLoading = false;
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.status.isFailed = true;
                state.status.isLoading = false;
            })
            .addCase(createCategory.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.expenses = [...state.expenses, action.payload.expenses]; // нужно по id искать категорию и удалять
                state.income = [...state.income, action.payload.income];
                state.status.isLoading = false;
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.status.isFailed = true;
                state.status.isLoading = false;
            });
    },
});

export default categorySlice.reducer;
