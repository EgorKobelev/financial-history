import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryService } from "../../utils/category-service";

export const getAllCategories = createAsyncThunk(
    "categoryReducer/getAllCategories",
    async function (args, { rejectWithValue, dispatch }) {
        try {
            const { data } = await CategoryService.getAllCategories();
            return data;
        } catch (e) {
            return rejectWithValue("Не удалось получить все категории");
        }
    }
);

export const createCategory = createAsyncThunk(
    "categoryReducer/createCategory",
    async function (form, { rejectWithValue, dispatch }) {
        try {
            const { data } = await CategoryService.createCategory(form);
            return data;
        } catch (e) {
            return rejectWithValue("Не удалось получить создать категорию");
        }
    }
);

export const deleteCategory = createAsyncThunk(
    "categoryReducer/deleteCategory",
    async function (id, { rejectWithValue, dispatch }) {
        try {
            const { data } = await CategoryService.deleteCategory(id);
            return data;
        } catch (e) {
            return rejectWithValue("Не удалось удалить категорию");
        }
    }
);
