import QuestionsSlice from './slice';
export * from './types';

export const { getData, getDataSucceeded, getDataFailed } = QuestionsSlice.actions;

export default QuestionsSlice.reducer;
