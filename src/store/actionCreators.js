import {
  GET_API_LIST,
  SET_API_LIST,
  ERROR_API_LIST,
  UPDATE_API_LIST,
  UPDATE_PAGINATION,
  SEARCH_RESULTS,
} from './action';

import axios from 'axios';

export const getApiList = () => {
  return (dispatch) => {
    dispatch({
      type: GET_API_LIST,
    });
  };
};

export const setApiList = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SET_API_LIST,
      payload: payload,
    });
  };
};

export const updateApiList = (payload) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_API_LIST,
      payload: payload,
    });
  };
};

export const errorApiList = (payload) => {
  return (dispatch) => {
    dispatch({
      type: ERROR_API_LIST,
    });
  };
};

export const updatePagination = (payload) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_PAGINATION,
      payload: payload,
    });
  };
};

export const searchResults = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SEARCH_RESULTS,
      payload: payload,
    });
  };
};

export const fetchApiData = (payload) => {
  return (dispatch) => {
    const url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${payload}`;
    return axios
      .get(url)
      .then((res) => {
        dispatch(setApiList(res.data));
      })
      .catch((err) => {
        dispatch(errorApiList(err.errors));
      });
  };
};
