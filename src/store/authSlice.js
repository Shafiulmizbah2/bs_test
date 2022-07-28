//This slice is handle all functionality about authentication flow.

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: "",
};

export const signIn = (email, password) => (dispatch) => {
  if (!email || !password)
    return dispatch(setError("email & password are required"));

  dispatch(setError(""));
  dispatch(setLoading(true));
  try {
    const name = email.split("@")[0];
    dispatch(setLoading(false));
    dispatch(setUser(name));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error));
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { setUser, setLoading, setError } = authSlice.actions;

export default authSlice.reducer;
