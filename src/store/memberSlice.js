//This slice is handle all functionality about Task flow.

import { v4 as uuidv4 } from "uuid";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  members: [],
  loading: false,
  error: "",
};

//this func is responsible for adding new task
export const addNewMember = (name, email) => (dispatch, getState) => {
  const { member } = getState();
  dispatch(setError(""));
  if (!name) return dispatch(setError("Name is required field!"));

  dispatch(setLoading(true));
  const id = uuidv4();

  try {
    dispatch(setLoading(false));
    const newMembers = [...member.members, { id, name, email }];
    dispatch(setError(""));
    dispatch(setMembers(newMembers));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error));
  }
};

//get sigle task
export const getMember = (id) => (dispatch, getState) => {
  dispatch(setError(""));
  const { member } = getState();

  const queryTask = member.members.find((item) => item.id === id);
  if (queryTask) return queryTask;
};

//update sigle task
export const updateMember = (data) => (dispatch, getState) => {
  const { member } = getState();
  dispatch(setError(""));
  if (!data.email) return dispatch(setError("Email is required field!"));
  dispatch(setLoading(true));
  const queryMember = member.members.filter((item) => item.id !== data.id);
  if (queryMember) {
    try {
      dispatch(setLoading(false));
      const newMembers = [...queryMember, { ...data }];
      dispatch(setMembers(newMembers));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error));
    }
  }
};

//update sigle task
export const deleteMember = (id) => (dispatch, getState) => {
  const { member } = getState();
  dispatch(setError(""));
  dispatch(setLoading(true));

  const queryMember = member.members.filter((item) => item.id !== id);
  if (queryMember) {
    try {
      dispatch(setLoading(false));
      dispatch(setMembers(queryMember));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error));
    }
  }
};

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setMembers: (state, { payload }) => {
      state.members = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { setMembers, setLoading, setError } = memberSlice.actions;

export default memberSlice.reducer;
