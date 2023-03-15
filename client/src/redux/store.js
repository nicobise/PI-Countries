import { createStore, applyMiddleware, compose } from "redux";
import {countryReducer} from "./reducer";
import thunkMiddleware from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  countryReducer,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;