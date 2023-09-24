import axios from 'axios';
import { API_URL } from '../config';
import initialState from './initialState';

export const getCategories = ({ categories }) => categories;

const reducerName = 'categories';
const createActionName = (name) => `app/${reducerName}/${name}`;

const LOAD_CATEGORIES = createActionName('LOAD_CATEGORIES');

export const loadCategories = (payload) => ({ type: LOAD_CATEGORIES, payload });

export const loadCategoriesRequest = () => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`${API_URL}/categories`, {
        withCredentials: true,
      });
      console.log('categories', res.data);
      dispatch(loadCategories(res.data));
    } catch (e) {
      console.log(e);
    }
  };
};

const categoriesReducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return [...action.payload];
    default:
      return statePart;
  }
};

export default categoriesReducer;
