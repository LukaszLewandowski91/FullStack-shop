import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import usersReducer from './usersRedux';
import initialState from './initialState';
import thunk from 'redux-thunk';

const subreducers = {
  user: usersReducer,
};

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f,
  ),
);

export default store;
