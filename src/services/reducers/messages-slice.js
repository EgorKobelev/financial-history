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
    reducers: {
        increaseMessagePage(state) {
            state.page = state.page + 1;
        },
        clearMessagesState(state) {
            state.page = 1;
            state.isFailed = false;
            state.messages = [];
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getHistory.fulfilled, (state, action) => {
                state.messages = [...state.messages, ...action.payload];
            })
            .addCase(getHistory.rejected, (state) => {
                state.isFailed = true;
            });
    },
});

export const { increaseMessagePage, clearMessagesState } = messaegsSlice.actions;

export default messaegsSlice.reducer;
