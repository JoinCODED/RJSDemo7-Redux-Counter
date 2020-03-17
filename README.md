# RJSDemo5-Redux

# Steps for branches: "with-redux" to "with-redux-advanced"

`Keep referring to the [Redux Flow Diagram](https://warehouse.joincoded.com/workshop/redux/intro-to-redux/the-redux-flow/) as you explain these concepts`

By the end of this demo, we're going to have a button that fetches posts from a server and displays them.

# 1. Using Multiple Reducers

1. Show the new `posts` state in the reducer. Explain how having all our different unrelated data in one reducer can get confusing and overwhelming very fast.

2. Seperate reducers by creating a `reducers` folder with `counter.js` and `posts.js` inside.

   `redux/reducers/counter.js`:

   ```javascript
   const initialState = {
     counter: 0
   };

   const reducer = (state = initialState, action) => {
     switch (action.type) {
       case "INCREMENT":
         return {
           ...state,
           counter: state.counter + action.payload
         };
       default:
         return state;
     }
   };

   export default reducer;
   ```

   `redux/reducers/posts.js`:

   ```javascript
   const initialState = {
     posts: []
   };

   const reducer = (state = initialState, action) => {
     switch (action.type) {
       case "SET_POSTS":
         return {
           ...state,
           posts: action.payload
         };
       default:
         return state;
     }
   };
   export default reducer;
   ```

3. Create a `redux/reducers/index.js` file which combines the reducers and builds and exports the store:

   `redux/reducers/index.js`

   ```javascript
   import { createStore, combineReducers } from "redux";

   import counterReducer from "./redux/reducers/counter";
   import postsReducer from "./redux/reducers/posts";

   const rootReducer = combineReducers({
     counterState: counterReducer,
     postsState: postsReducer
   });

   const store = createStore(rootReducer);

   export default store;
   ```

   `src/index.js`

   ```jsx
   ...
   import store from './redux/reducers' // Explain that importing a directory will import its index.js file

   ...

   <Provider store={store}>
   ```

4. Back in components, remap `mapStateToProps`:

   ```javascript
   const mapStateToProps = state => {
     return {
       counter: state.counterState.counter,
       posts: state.postsState.posts
     };
   };
   ```

# 2. Restructuring Actions - Tidying Things Up!

1.  Inside `redux`, create `actions` folder. Inside `actions`:
    a. `actionTypes.js`
    b. `counter.js`
    c. `posts.js`
    d. `index.js`

2.  Move the actionCreators to their respective files:

    `actionCreators/counter.js`

    ```javascript
    export const increment = step => {
      return {
        type: "INCREMENT",
        payload: step
      };
    };
    ```

    `actionCreators/posts.js`

    ```javascript
    export const fetchPosts = () => {
      return {
        type: "SET_POSTS",
        payload: [
          { title: "one thing" },
          { title: "another thing" },
          { title: "one more thing" }
        ]
      };
    };
    ```

3.  inside `actionCreators/actionTypes.js` - keeping a single source of action strings to avoid typos and to improve organization:

    ```javascript
    export const INCREMENT = "INCREMENT";
    export const SET_POSTS = "SET_POSTS";
    ```

4.  Import the action type and start using them (in both actionCreators and reducers):

    `actionCreators/counter.js`

    ```javascript
    import { INCREMENT } from "./actionTypes";

    export const increment = step => {
      return {
        type: INCREMENT
        payload: step
      };
    };
    ```

    `actionCreators/posts.js`

    ```javascript
    import { SET_POSTS } from "./actionTypes";

    export const fetchPosts = () => {
      return {
        type: SET_POSTS,
        payload: [
          { title: "one thing" },
          { title: "another thing" },
          { title: "one more thing" }
        ]
      };
    };
    ```

    `reducers/counter.js`:

    ```javascript
    import { INCREMENT } from "../actionCreators/actionTypes";

    ...
        case INCRMENT:
          return {
            ...state,
            counter: state.counter + action.payload
          };
    ...
    ```

    `reducers/posts.js`:

    ```javascript
    import { SET_POSTS } from "../actionCreators/actionTypes";

    ...
        case SET_POSTS:
          return {
            ...state,
            posts: action.payload
          };
    ...
    ```

5.  In `actionCreators/index.js`, this file is in charge of exporting all of our actions in the seperate action fiels:

    ```javascript
    export { increment } from "./counter";
    export { posts } from "./posts";
    ```

6.  Update all components by importing the exported actions, and use them in `mapDispatchToProps`:

    ```javascript
    import { increment } from "./redux/actionCreators";
    ```

# 3. Installing Redux Dev Tools

1. Install the [Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) chrome extension

2. In `redux/reducers/index.js`:

   ```javascript

   import {compose} from 'redux';

   ...

   const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

   ...

   const store = createStore(rootReducer, composeEnhancers());
   ```

Show them the Dev Tool on the Chrome browser.

# 4. Adding Redux Thunk - Async Calls in Redux

Let's upgrade our `fetchPosts` action creator so it actually fetches the posts from a server.

1. Try to make an axios request in `redux/actionCreators/posts.js`:

   ```javascript
   import axios from "axios";

   export const fetchPosts = async () => {
     const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
     const posts = res.data;

     return {
       type: SET_POSTS,
       payload: posts
     };
   };
   ```

   This will **FAIL** because in pure redux actionCreators **cannot** be `async` functions (i.e. promises)

2. Add the redux-thunk package `yarn add redux-thunk`
3. In `redux/reducers/index.js`:

   ```javascript
   import { applyMiddleware } from "redux";
   import thunk from "redux-thunk";

   const store = createStore(
     rootReducer,
     composeEnhancers(applyMiddleware(thunk))
   );
   ```

4. Modify the `fetchPosts` function to use `thunk`:

   ```javascript
   import axios from "axios";

   export const fetchPosts = () => {
     return async dispatch => {
       //This function gets called by Redux Thunk
       const res = await axios.get(
         "https://jsonplaceholder.typicode.com/posts"
       );
       const posts = res.data;
       dispatch({
         type: actionTypes.FETCH_POSTS,
         payload: posts
       });
     };
   };
   ```

# End of "with-redux-advanced" branch

# End of "Redux" demo
