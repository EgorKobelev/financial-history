import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user-slice";
import categoryReducer from "./reducers/category-slice";
import operationReducer from "./reducers/operation-slice";
import messagesReducer from "./reducers/messages-slice";

const rootReducer = combineReducers({
    userReducer,
    categoryReducer,
    operationReducer,
    messagesReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
