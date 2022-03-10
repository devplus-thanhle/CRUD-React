import { createStore, applyMiddleware } from "redux";
// import { Provide } from 'react-redux';
import thunk from "redux-thunk";

import rootReducer from "../redux/Reducer/index";

import { composeWithDevTools } from "redux-devtools-extension";

// const composeEnhancers =
//   (process.env.NODE_ENV !== "production" &&
//     typeof window !== "undefined" &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
