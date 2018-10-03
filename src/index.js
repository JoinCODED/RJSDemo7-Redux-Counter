import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { Provider } from "react-redux";

import { createStore, combineReducers } from "redux";
import counterReducer from "./store/reducers/counter";
import logReducer from "./store/reducers/log";

const rootReducer = combineReducers({
  rootCtr: counterReducer,
  rootLog: logReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
