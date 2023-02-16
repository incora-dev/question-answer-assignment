import LoginSlice from './slice';
export * from './types';

export const { login, loginSucceeded, loginFailed } = LoginSlice.actions;

export default LoginSlice.reducer;
