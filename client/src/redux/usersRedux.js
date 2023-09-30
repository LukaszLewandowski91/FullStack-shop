import axios from 'axios';
import { API_URL } from '../config';
import initialState from './initialState';
export const getRequest = ({ user }, name) => user.requests[name];
export const getUser = ({ user }) => user;
const reducerName = 'users';
const createActionName = (name) => `app/${reducerName}/${name}`;

export const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

export const logIn = (payload) => ({ type: LOG_IN, payload });
export const logOut = () => ({ type: LOG_OUT });

export const startRequest = (payload) => ({ payload, type: START_REQUEST });
export const endRequest = (payload) => ({ payload, type: END_REQUEST });
export const errorRequest = (payload) => ({ payload, type: ERROR_REQUEST });

export const loadLoggedUser = (userData) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: LOG_IN }));
    try {
      let res = await axios.post(`${API_URL}/auth/login`, userData, {
        withCredentials: true,
      });
      dispatch(logIn(res.data));
      localStorage.setItem('login', JSON.stringify(res.data));
      dispatch(endRequest({ name: LOG_IN }));
      return res;
    } catch (e) {
      dispatch(errorRequest({ name: LOG_IN, error: e.response.status }));
    }
  };
};

export const loadUserFromCookies = (userData) => {
  return async (dispatch) => {
    try {
      await dispatch(logIn(userData));
    } catch (e) {
      return e;
    }
  };
};

export const registerUser = (userData) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: LOG_IN }));
    try {
      let res = await axios.post(`${API_URL}/auth/register`, userData, {
        withCredentials: true,
      });
      return res;
    } catch (e) {
      console.log(e);
      dispatch(errorRequest({ name: LOG_IN, error: e.response.status }));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      await axios.delete(`${API_URL}/auth/logout`, {
        withCredentials: true,
      });
      localStorage.removeItem('login');
      dispatch(logOut());
    } catch (e) {
      console.log('error', e);
    }
  };
};

const usersReducer = (statePart = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...statePart, users: action.payload };
    case LOG_OUT:
      return initialState;
    case START_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: { pending: true, error: null, success: false },
        },
      };
    case END_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: { pending: false, error: null, success: true },
        },
      };
    case ERROR_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: {
            pending: false,
            error: action.payload.error,
            success: false,
          },
        },
      };

    default:
      return statePart;
  }
};

export default usersReducer;
