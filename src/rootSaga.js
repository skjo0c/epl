import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects';
import dashboardSaga from './dashboard-saga';

export default function* rootSaga() {
  yield all([dashboardSaga()]);
}
