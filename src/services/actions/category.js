import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryService } from "../../utils/category-service";

export const getAllCategories = createAsyncThunk(
    "categoryReducer/getAllCategories",
    async function (args, { rejectWithValue, dispatch }) {
        try {
            const { data } = await CategoryService.getAllCategories();
            return { expenses: data.expenses, income: data.income };
        } catch (e) {
            return rejectWithValue("Не удалось получить все категории");
        }
    }
);

export const createCategory = createAsyncThunk(
    "categoryReducer/createCategory",
    async function (args, { rejectWithValue, dispatch }) {
        try {
            const { data } = await CategoryService.createCategory();
            return {
                expenses: data.type === "expenses" ? data.category : null,
                income: data.type === "income" ? data.category : null,
            };
        } catch (e) {
            return rejectWithValue("Не удалось получить создать категорию");
        }
    }
);

export const deleteCategory = createAsyncThunk(
    "categoryReducer/createCategory",
    async function (id, { rejectWithValue, dispatch }) {
        try {
            const { data } = await CategoryService.deleteCategory();
            return id;
        } catch (e) {
            return rejectWithValue("Не удалось удалить категорию");
        }
    }
);
