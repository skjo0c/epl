import {
  GET_EPL_DATA,
  GET_EPL_DATA_SUCCESS,
  GET_EPL_DATA_ERROR,
} from './dashboard-constants.js';

export const initialState = {
  eplDataLoading: false,
  year: '',
  eplData: [],
  eplDataError: '',
};

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EPL_DATA:
      return { ...state, eplDataLoading: true, year: action.year };
    case GET_EPL_DATA_SUCCESS:
      return { ...state, eplDataLoading: false, eplData: action.data };
    case GET_EPL_DATA_ERROR:
      return { ...state, eplDataLoading: false, eplDataError: action.error };

    default:
      return state;
  }
};
