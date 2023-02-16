import { createSlice } from '@reduxjs/toolkit';
import { LOGIN_SLICE_NAME } from './constants';

import { ILoginState } from './types';

const initialState: ILoginState = {
  isLoggedIn: Boolean(localStorage.getItem('token')),
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: LOGIN_SLICE_NAME,
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.isLoggedIn = true;
      state.loading = true;
    },
    loginSucceeded: (state, { payload }) => {
      state.loading = false;
    },
    loginFailed: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default loginSlice;
