import { createSelector } from 'reselect';
import { initialState } from './dashboard-reducer';

const dashboardStates = ({ dashboardReducer }) =>
  dashboardReducer || initialState;

const createMakeSelector = (key) => () =>
  createSelector(dashboardStates, (state) => state[key]);

export const makeSelectEplYear = createMakeSelector('year');
export const makeSelectEplDataLoading = createMakeSelector('eplDataLoading');
export const makeSelectEplData = createMakeSelector('eplData');
export const makeSelectEplDataError = createMakeSelector('eplDataError');
