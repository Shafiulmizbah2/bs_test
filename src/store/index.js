import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import authSlice from "./authSlice.js";
import taskSlice from "./taskSlice.js";
import memberSlice from "./memberSlice.js";

const reducers = combineReducers({
  auth: authSlice,
  member: memberSlice,
  task: taskSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "task", "member"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.REACT_APP_ENVIRONMENT === "dev",
  middleware: [thunk],
});
