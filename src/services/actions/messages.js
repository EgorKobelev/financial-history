import { createAsyncThunk } from "@reduxjs/toolkit";
import { MessagesService } from "../../utils/messages-service";

export const getHistory = createAsyncThunk("messagesReducer/getHistory", async function (_, { getState, rejectWithValue }) {
    try {
        const store = getState();
        const isFailed = store.messagesReducer.isFailed;
        const page = store.messagesReducer.page;
        const { data } = isFailed ? [] : await MessagesService.getHistory({ page });
        // toast.success("Баланс обновлен", { autoClose: 3000 });
        return data;
    } catch (e) {
        // toast.error("Не удалось обновить баланс", { autoClose: 3000 });
        return rejectWithValue("Не удалось получить историю");
    }
});
