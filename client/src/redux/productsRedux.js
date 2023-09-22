import axios from 'axios';
import { API_URL } from '../config';
import initialState from './initialState';
export const getProducts = ({ product }) => product.data;

const reducerName = 'products';
const createActionName = (name) => `app/${reducerName}/${name}`;

const LOAD_PRODUCTS = createActionName('LOAD_PRODUCTS');

export const loadProducts = (payload) => ({ type: LOAD_PRODUCTS, payload });

export const loadProductsRequest = () => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`${API_URL}/products`, {
        withCredentials: true,
      });
      console.log('tab', res.data);
      dispatch(loadProducts(res.data));
    } catch (e) {
      console.log(e);
    }
  };
};

/* REDUCER */
const productsReducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return [...action.payload];

    default:
      return statePart;
  }
};

export default productsReducer;
