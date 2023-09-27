export const getCart = ({ cart }) => cart;

const reducerName = 'cart';
const createActionName = (name) => `app/${reducerName}/${name}`;

const ADD_TO_CART = createActionName('ADD_TO_CART');
const EDIT_CART = createActionName('EDIT_CART');
const REMOVE_ITEM_CART = createActionName('REMOVE_ITEM_CART');

export const addToCart = (payload) => ({ type: ADD_TO_CART, payload });
export const editCart = (payload) => ({ type: EDIT_CART, payload });
export const removeItemCart = (payload) => ({
  type: REMOVE_ITEM_CART,
  payload,
});

const cartReducer = (statePart = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...statePart, { ...action.payload }];
    case EDIT_CART:
      return statePart.map((e) =>
        e.id === action.payload.id ? { ...e, ...action.payload } : e,
      );
    case REMOVE_ITEM_CART:
      return [...statePart.filter((item) => item.id !== action.payload)];
    default:
      return statePart;
  }
};

export default cartReducer;
