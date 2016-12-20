import { fork, call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import ZenService from '../services/zen';

function* fetchZen() {
  try {
    const payload = yield call(ZenService.getZen);
    yield put({
      type: 'zen/get/success',
      payload
    });
  } catch (error) {
    yield put({
      type: 'zen/get/failed',
      error
    });
  }
}

function* watchFetchZen() {
  yield takeLatest('zen/get', fetchZen);
}

function* zenSaga() {
  yield fork(watchFetchZen);
}

export default zenSaga;
