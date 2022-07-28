import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import taskSlice from "./taskSlice.js";

export const store = configureStore({
  reducer: {
    task: taskSlice,
    auth: authSlice,
  },
});
