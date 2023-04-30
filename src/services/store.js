import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user-slice";

const rootReducer = combineReducers({
    userReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
