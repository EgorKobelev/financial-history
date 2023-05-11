import { createSlice } from "@reduxjs/toolkit";
import { createCategory, getAllCategories, deleteCategory } from "../actions/category";

const initialState = {
    expenses: [],
    income: [],

    status: {
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
                state.expenses = action.payload.listCategoriesExpenses;
                state.income = action.payload.listCategoriesIncome;
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

// const categorySlice = createSlice({
//     name: "categoryReducer",
//     initialState,
//     reducers: {},
//     extraReducer: (builder) => {
//         builder
//             .addCase(getAllCategories.pending, (state) => {
//                 state.status.isLoading = true;
//             })
//             .addCase(getAllCategories.fulfilled, (state, action) => {
//                 state.expenses = action.payload.listCategoriesExpenses;
//                 state.income = action.payload.listCategoriesIncome;
//                 state.status.isLoading = false;
//             })
//             .addCase(getAllCategories.rejected, (state, action) => {
//                 state.status.isFailed = true;
//                 state.status.isLoading = false;
//             });
//         // .addCase(createCategory.pending, (state) => {
//         //     state.status.isLoading = true;
//         // })
//         // .addCase(createCategory.fulfilled, (state, action) => {
//         //     state.expenses = [...state.expenses, action.payload.expenses];
//         //     state.income = [...state.income, action.payload.income];
//         //     state.status.isLoading = false;
//         // })
//         // .addCase(createCategory.rejected, (state, action) => {
//         //     state.status.isFailed = true;
//         //     state.status.isLoading = false;
//         // })
//         // .addCase(createCategory.pending, (state) => {
//         //     state.status.isLoading = true;
//         // })
//         // .addCase(createCategory.fulfilled, (state, action) => {
//         //     state.expenses = [...state.expenses, action.payload.expenses]; // нужно по id искать категорию и удалять
//         //     state.income = [...state.income, action.payload.income];
//         //     state.status.isLoading = false;
//         // })
//         // .addCase(createCategory.rejected, (state, action) => {
//         //     state.status.isFailed = true;
//         //     state.status.isLoading = false;
//         // });
//     },
// });

export default categorySlice.reducer;
