import { all, fork } from 'redux-saga/effects';
import questionsSaga from './questions/sagas';
import loginSaga from './login/sagas';

export default function* rootSaga(): Generator {
  yield all([
    fork(questionsSaga),
    fork(loginSaga),
  ]);
}
