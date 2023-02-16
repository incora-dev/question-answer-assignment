import { createSlice } from '@reduxjs/toolkit';
import { QUESTIONS_SLICE_NAME } from './constants';

import { IQuestionsState } from './types';

const initialState: IQuestionsState = {
  answers: [],
  loading: false,
  error: null,
};

const questionsSlice = createSlice({
  name: QUESTIONS_SLICE_NAME,
  initialState,
  reducers: {
    getData: (state, { payload }) => {
      state.loading = true;
    },
    getDataSucceeded: (state, { payload }) => {
      state.answers = payload;
      state.loading = false;
    },
    getDataFailed: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default questionsSlice;
