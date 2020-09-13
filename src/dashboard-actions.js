import {
  GET_EPL_DATA,
  GET_EPL_DATA_SUCCESS,
  GET_EPL_DATA_ERROR,
} from './dashboard-constants.js';

export const getEplData = (year) => {
  return {
    type: GET_EPL_DATA,
    year,
  };
};

export const getEplDataSuccess = (data) => {
  return {
    type: GET_EPL_DATA_SUCCESS,
    data,
  };
};

export const getEplDataError = (error) => {
  return {
    type: GET_EPL_DATA_ERROR,
    error,
  };
};
