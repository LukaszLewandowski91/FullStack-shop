import axios from 'axios';
import { API_URL } from '../config';

export const getCart = ({ cart }) => cart;

const reducerName = 'cart';
const createActionName = (name) => `app/${reducerName}/${name}`;

const ADD_TO_CART = createActionName('ADD_TO_CART');
const EDIT_CART = createActionName('EDIT_CART');
const REMOVE_ITEM_CART = createActionName('REMOVE_ITEM_CART');
const SEND_ORDER = createActionName('SEND_ORDER');

export const clearCart = () => ({ type: SEND_ORDER });

export const addToCart = (payload) => ({ type: ADD_TO_CART, payload });
export const editCart = (payload) => ({ type: EDIT_CART, payload });
export const removeItemCart = (payload) => ({
  type: REMOVE_ITEM_CART,
  payload,
});

export const sendOrderRequest = (orderData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${API_URL}/orders`, orderData, {
        withCredentials: true,
      });

      localStorage.removeItem('cart');
      dispatch(clearCart());
      return res;
    } catch (e) {
      console.log(e);
    }
  };
};
const cartReducer = (statePart = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...statePart, { ...action.payload }];
    case EDIT_CART:
      return statePart.map((e) =>
        e.productId === action.payload.productId
          ? { ...e, ...action.payload }
          : e,
      );
    case REMOVE_ITEM_CART:
      return [...statePart.filter((item) => item.productId !== action.payload)];
    case SEND_ORDER:
      return [];
    default:
      return statePart;
  }
};

export default cartReducer;
