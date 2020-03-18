import { createStore, combineReducers, compose, applyMiddleware } from "redux";

// Reducers
import counterReducer from "./reducers/counter";
import postsReducer from "./reducers/posts";

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
