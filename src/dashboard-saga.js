import { call, select, put, takeLatest } from 'redux-saga/effects';
import { GET_EPL_DATA } from './dashboard-constants.js';

import { formattedTable } from './utils/formatEplTable';
import request from './utils/request.js';

import { getEplDataSuccess, getEplDataError } from './dashboard-actions';
import { makeSelectEplYear } from './dashboard-selector.js';

function* fetchEPLData() {
  try {
    const eplYear = yield select(makeSelectEplYear());
    const result = yield call(request, `/${eplYear}/en.1.json`);
    yield put(getEplDataSuccess(result?.rounds));
  } catch (error) {
    yield put(getEplDataError('Opps! Something went wrong.'));
  }
}

export default function* dashboardSaga() {
  yield takeLatest(GET_EPL_DATA, fetchEPLData);
}
