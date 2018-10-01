import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { Provider } from "react-redux";

import { createStore, combineReducers } from "redux"; //STEP 1
import counterReducer from "./store/reducers/counter"; //STEP 2
import logReducer from "./store/reducers/log"; // STEP 2

//STEP 3
const rootReducer = combineReducers({
  rootCtr: counterReducer,
  rootLog: logReducer
});

const store = createStore(rootReducer); //STEP 4

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
