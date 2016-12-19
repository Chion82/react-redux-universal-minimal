import { fork, call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import ProfileService from '../services/profile';

function* fetchProfile() {
  try {
    const data = yield call(ProfileService.getProfile, 'Chion82');
    yield put({
      type: 'profile/get/success',
      data
    });
  } catch (error) {
    yield put({
      type: 'profile/get/failed',
      error
    });
  }
}

function* watchFetchProfile() {
  yield takeLatest('profile/get', fetchProfile);
}

function* profileSaga() {
  yield fork(watchFetchProfile);
}

export default profileSaga;
