//This slice is handle all functionality about Task flow.

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  loading: false,
  error: "",
};

//this func is responsible for adding new task
export const addNewTask =
  (title, description, assignTo) => (dispatch, getState) => {
    const { task } = getState();
    dispatch(setError(""));
    if (!title) return dispatch(setError("Title is required field!"));

    dispatch(setLoading(true));
    const date = new Date().toDateString();

    try {
      dispatch(setLoading(false));
      const newTasks = [
        ...task.tasks,
        { title, description, assignTo, createdAt: date },
      ];
      dispatch(setTask(newTasks));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error));
    }
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
