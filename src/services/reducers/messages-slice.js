import { createSlice } from "@reduxjs/toolkit";
import { getHistory } from "../actions/messages";

const initialState = {
    messages: [],
    page: 1,
    isFailed: false,
};

const messaegsSlice = createSlice({
    name: "messagesSlice",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(getHistory.fulfilled, (state, action) => {
                state.messages = [...state.messages, ...action.payload.messages];
                state.page = state.page + 1;
            })
            .addCase(getHistory.rejected, (state) => {
                state.status.isFailed = true;
            });
    },
});

export default messaegsSlice.reducer;
