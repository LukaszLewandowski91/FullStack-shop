import axios from 'axios';
import { API_URL } from '../config';

export const getProducts = ({ product }) => product;
export const getProductById = ({ product }, id) =>
  product.find((prod) => prod.id === id);

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

      dispatch(loadProducts(res.data));
    } catch (e) {
      console.log(e);
    }
  };
};

/* REDUCER */
const productsReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return [...action.payload];

    default:
      return statePart;
  }
};

export default productsReducer;
