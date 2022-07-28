import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  loading: false,
  error: "",
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask: (state, { payload }) => {
      state.tasks = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { setTask, setLoading, setError } = taskSlice.actions;

export default taskSlice.reducer;
