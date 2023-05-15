import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../utils/auth-service";
import { clearUser } from "../reducers/user-slice";

export const register = createAsyncThunk("userReducer/register", async function (form, { rejectWithValue, dispatch }) {
    const { email, password, name } = form;
    try {
        const { data } = await AuthService.register(email, password, name);
        localStorage.setItem("accessToken", data.accessToken);
        return { name, email };
    } catch (e) {
        return rejectWithValue("Пользователь уже зарегестрирован");
    }
});

export const login = createAsyncThunk("userReducer/login", async function (form, { rejectWithValue, dispatch }) {
    const { email, password } = form;
    try {
        const { data } = await AuthService.login(email, password);
        localStorage.setItem("accessToken", data.accessToken);
        return { name: data.name, email: data.email };
    } catch (e) {
        return rejectWithValue("Ощибка при авторизации");
    }
});

export const update = createAsyncThunk("userReducer/update", async function (form, { rejectWithValue, dispatch }) {
    try {
        const { data } = await AuthService.update(form);
        localStorage.setItem("accessToken", data.accessToken);
        return form;
    } catch (e) {
        return rejectWithValue("Ощибка при авторизации");
    }
});

export const logout = createAsyncThunk("userReducer/logout", async function (ars, { rejectWithValue, dispatch }) {
    try {
        await AuthService.logout();
        dispatch(clearUser());
        localStorage.clear();
    } catch (e) {
        return rejectWithValue("Ощибка при выходе");
    }
});

export const loginWithToken = createAsyncThunk(
    "userReducer/loginWithToken",
    async function (ars, { rejectWithValue, dispatch }) {
        try {
            const { data } = await AuthService.tokenLogin();
            localStorage.setItem("accessToken", data.accessToken);
            return { name: data.name, email: data.email };
        } catch (e) {
            return rejectWithValue("Ощибка при выходе");
        }
    }
);
