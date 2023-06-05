import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryService } from "../../utils/category-service";
import { toast } from "react-toastify";

export const getAllCategories = createAsyncThunk("categoryReducer/getAllCategories", async function (args, { rejectWithValue, dispatch }) {
    try {
        const { data } = await CategoryService.getAllCategories();
        return data;
    } catch (e) {
        return rejectWithValue("Не удалось получить все категории");
    }
});

export const createCategory = createAsyncThunk("categoryReducer/createCategory", async function (form, { rejectWithValue, dispatch }) {
    try {
        const { data } = await CategoryService.createCategory(form);
        toast.success("Категория добавлена", { autoClose: 3000 });
        return data;
    } catch (e) {
        toast.error("Не удалось добавить категорию", { autoClose: 3000 });
        return rejectWithValue("Не удалось получить создать категорию");
    }
});

export const deleteCategory = createAsyncThunk("categoryReducer/deleteCategory", async function (id, { rejectWithValue, dispatch }) {
    try {
        const { data } = await CategoryService.deleteCategory(id);
        toast.success("Категория удалена", { autoClose: 3000 });
        return data;
    } catch (e) {
        toast.error("Не удалось удалить категорию", { autoClose: 3000 });
        return rejectWithValue("Не удалось удалить категорию");
    }
});

export const getImages = createAsyncThunk("categoryReducer/getImages", async function (args, { rejectWithValue, dispatch }) {
    try {
        const { data } = await CategoryService.getImages();
        return data.pictures;
    } catch (e) {
        return rejectWithValue("Не удалось удалить категорию");
    }
});
