import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { put, call, takeLatest, StrictEffect } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import QuestionsApi from './api';
import { IQuestionsPayload, IQuestionsRequestData } from './types';
import { getData, getDataFailed, getDataSucceeded } from './index';

function* questionsWorker({ payload }: PayloadAction<IQuestionsRequestData>): SagaIterator {
  try {
    const { data }: AxiosResponse<IQuestionsPayload> = yield call(QuestionsApi.answerQuestion, payload);
    yield put(getDataSucceeded(data.answers));
  } catch (e) {
    yield put(getDataFailed(e));
  }
}

export default function* loginRootSaga(): Generator<StrictEffect, void> {
  yield takeLatest(getData.type, questionsWorker);
}
