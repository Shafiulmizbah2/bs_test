import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import authSlice from "./authSlice.js";
import taskSlice from "./taskSlice.js";

const reducers = combineReducers({
  task: taskSlice,
  auth: authSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "task"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.REACT_APP_ENVIRONMENT === "dev",
  middleware: [thunk],
});
