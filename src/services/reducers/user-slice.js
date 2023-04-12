import { createSlice } from "@reduxjs/toolkit";
import {register, login, loginWithToken} from "../actions/user";

const initialState = {
    user: null,
    status: {
        isLoading: false,
        fetchUserFailed: false,
    },
};

const userSlice = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        clearUser(state) {
            state.user = null
        },
        updateUser(state, action) {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.status.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status.isLoading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.status.fetchUserFailed = true;
                state.status.isLoading = false;
            })
            .addCase(login.pending, (state) => {
                state.status.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status.isLoading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.status.fetchUserFailed = true;
                state.status.isLoading = false;
            })
            .addCase(loginWithToken.pending, (state) => {
                state.status.isLoading = true
            })
            .addCase(loginWithToken.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status.isLoading = false;
            })
            .addCase(loginWithToken.rejected, (state, action) => {
                state.status.fetchUserFailed = true;
                state.status.isLoading = false;
            })
    }
});

export const { fetchUserLoading, fetchUserSucces, clearUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
