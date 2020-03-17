import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { createStore } from "redux"; //STEP 1
import { Provider } from "react-redux";

import App from "./App";

import reducer from "./redux/reducer"; //STEP 2

const store = createStore(reducer); //STEP 4

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
