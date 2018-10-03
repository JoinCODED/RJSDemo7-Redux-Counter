import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { Provider } from "react-redux";

import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import counterReducer from "./store/reducers/counter";
import logReducer from "./store/reducers/log";
import postsReducer from "./store/reducers/posts";

import thunk from "redux-thunk";

const rootReducer = combineReducers({
  rootCtr: counterReducer,
  rootLog: logReducer,
  rootPosts: postsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
