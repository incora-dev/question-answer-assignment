import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import questionsReducer from './questions/index';
import loginReducer from './login/index';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  questions: questionsReducer,
  login: loginReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
