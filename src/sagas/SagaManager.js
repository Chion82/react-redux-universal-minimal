import { fork, take, cancel } from 'redux-saga/effects';

export const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR';

export const createAbortableSaga = (rootSaga) => {
  if (__DEVELOPMENT__) {
    return function* () {
      const sagaTask = yield fork(rootSaga);
      yield take(CANCEL_SAGAS_HMR);
      yield cancel(sagaTask);
    };
  } else {
    return rootSaga;
  }
};

const SagaManager = {
  startSagas(sagaMiddleware, rootSaga) {
    return sagaMiddleware.run(createAbortableSaga(rootSaga));
  },

  cancelSagas(store) {
    return store.dispatch({
      type: CANCEL_SAGAS_HMR
    });
  },
};

export default SagaManager;
