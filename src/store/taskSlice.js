//This slice is handle all functionality about Task flow.

import { v4 as uuidv4 } from "uuid";

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
    const id = uuidv4();

    try {
      dispatch(setLoading(false));
      const newTasks = [
        ...task.tasks,
        { id, title, description, assignTo, createdAt: date },
      ];
      dispatch(setTask(newTasks));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error));
    }
  };

//get sigle task
export const getTask = (id) => (dispatch, getState) => {
  dispatch(setError(""));
  const { task } = getState();

  const queryTask = task.tasks.find((item) => item.id === id);
  if (queryTask) return queryTask;
};

//update sigle task
export const updateTask = (data) => (dispatch, getState) => {
  const { task } = getState();
  dispatch(setError(""));
  if (!data.title) return dispatch(setError("Title is required field!"));
  dispatch(setLoading(true));
  const queryTask = task.tasks.filter((item) => item.id !== data.id);
  if (queryTask) {
    try {
      dispatch(setLoading(false));
      const newTasks = [...queryTask, { ...data }];
      dispatch(setTask(newTasks));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error));
    }
  }
};

//update sigle task
export const deleteTask = (id) => (dispatch, getState) => {
  const { task } = getState();
  dispatch(setError(""));
  dispatch(setLoading(true));

  const queryTask = task.tasks.filter((item) => item.id !== id);
  if (queryTask) {
    try {
      dispatch(setLoading(false));
      console.log(queryTask);
      dispatch(setTask(queryTask));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error));
    }
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
