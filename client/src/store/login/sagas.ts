import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { put, call, takeLatest, StrictEffect } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import LoginApi from './api';
import { ILoginPayload, ILoginRequestData } from './types';
import { login, loginFailed, loginSucceeded } from './index';

function* questionsWorker({ payload }: PayloadAction<ILoginRequestData>): SagaIterator {
  try {
    const { data }: AxiosResponse<ILoginPayload> = yield call(LoginApi.login, payload);
    localStorage.setItem('token', data.token);
    yield put(loginSucceeded(data.token));
  } catch (e) {
    yield put(loginFailed(e));
  }
}

export default function* loginRootSaga(): Generator<StrictEffect, void> {
  yield takeLatest(login.type, questionsWorker);
}
