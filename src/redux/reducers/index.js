import { createStore, combineReducers, compose, applyMiddleware } from "redux";

// Reducers
import counterReducer from "./counter";
import postsReducer from "./posts";

import thunk from "redux-thunk";

const rootReducer = combineReducers({
  counterState: counterReducer,
  postsState: postsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
