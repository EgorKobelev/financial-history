import { createSlice } from "@reduxjs/toolkit";
import { register, login, loginWithToken, update } from "../actions/user";

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
            state.user = null;
            state.status = {
                isLoading: false,
                fetchUserFailed: false,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.status.isLoading = true;
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
                state.status.isLoading = true;
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
                state.status.isLoading = true;
            })
            .addCase(loginWithToken.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status.isLoading = false;
            })
            .addCase(loginWithToken.rejected, (state, action) => {
                state.status.fetchUserFailed = true;
                state.status.isLoading = false;
            })
            .addCase(update.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(update.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status.isLoading = false;
            })
            .addCase(update.rejected, (state, action) => {
                state.status.fetchUserFailed = true;
                state.status.isLoading = false;
            });
    },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
