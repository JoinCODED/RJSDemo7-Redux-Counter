# RJSDemo5-Redux
# Steps for branches: "starting-point" to "with-redux"

`Keep referring to the [Redux Flow Diagram](https://warehouse.joincoded.com/workshop/redux/intro-to-redux/the-redux-flow/) as you explain these concepts`

# Installing Redux Dev Tools

1. Install the [Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) chrome extension 
2. In `index.js`:
```javascript

import {compose} from 'redux';

...

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

... 

const store = createStore(rootReducer, composeEnhancers());
```
Show them the Dev Tool on the Chrome browser. 

# Restructuring Actions - Tidying Things Up!

3. Inside the `store`, create `actions` folder. Inside `actions` `a. actionTypes.js` `b. counter.js`  `c. log.js,`  `d.index.js`. Yes, you read that right. A new `index.js` file in the `actions` folder. 

a. nside `actions/actionTypes.js` - keeping a single source of action strings to avoid typos and to increate organization:
```javascript
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const LOG = "LOG";
```

b. Inside `actions/counter.js` - import the action type and start using them:

```
javascript
import * as actionTypes from './actionTypes';

export const increment = () => {
return {
type: actionTypes.INCREMENT,
}
}

export const decrement = () => {
return {
type: actionTypes.DECREMENT,
}
}
```

c. Inside `actions/log.js` - do the same: 
```javascript
import * as actionTypes from './actionTypes';

export const log = () => {
return {
type: actionTypes.LOG, 
}
}
```

d. In `actions/index/js`, this file is in charge of exporting all of our actions in the seperate action fiels: 
```javascript
export {
increment,
decrement,
} from './counter';


export {
log,
} from './log';
```

4. Update `Counter.js` by importing the exported actions, and use them in `mapDispatchToProps`:
```javascript
import * as actionCreators from '../../store/actions/index';
```

# Using the actionTypes in the Reducers

5. In `reducers/counter.js`: 
```javascript
import * as actionTypes from '../actions/actionTypes';

const initialState = {
copyMe: "Remember to copy me!",
counter: 0,
}

const reducer = (state=initialState, action) => {
switch(action.type){
case actionTypes.INCREMENT:
return {
...state,
counter: state.counter + 1, //copy all of the old state, and only manipulate the part we want to manipulate.
}
case actionTypes.DECREMENT:
return {
...state,
counter: state.counter - 1,
}
default:
return state;
}
}

export default reducer;
```

In `reducers/log.js`:
```javascript
import * as actionTypes from '../actions/actionTypes';

const initialState = {
copyMe2: "Remember to copy me too!",
logCounter: 0,
}

const reducer = (state=initialState, action) => {
switch(action.type){
case actionTypes.LOG:
const logCounter = state.logCounter + 1;
return {
...state,
logCounter: logCounter,
}
default:
return state;
}
}

export default reducer;
```

# Adding Redux Thunk - Async Calls in Redux

6. Add the redux-thunk package `yarn add redux-thunk`
7. In `index.js`:
```javascript
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
```

# Handling Async Code

8. In `Counter.js`, add a `Fetch Posts` button that will fetch post from an API
```javascript
<button onClick={this.props.onFetchPosts}>Fetch Posts</button>
```
9. Create  a new actionType in `actionTypes.js` called `FETCH_POSTS`. 
10. Create a `posts.js` in `store/actions` and dispatch an async action: 

```javascript
import * as actionTypes from "../actions/actionTypes";
import axios from "axios";

export const fetchPosts = () => {
return dispatch => {
//This function gets called by Redux Thunk
axios
.get("https://jsonplaceholder.typicode.com/posts")
.then(res => res.data)
.then(posts =>
dispatch({
type: actionTypes.FETCH_POSTS,
payload: posts
})
);
};
};
```
11. Create a `posts.js` in `store/reducers` with: 

```javascript
import * as actionTypes from '../actions/actionTypes';

const initialState = {
copyMe3: "Remeber to copy me!",
posts: [],
}

const reducer = (state=initialState, action) => {
switch(action.type){
case actionTypes.FETCH_POSTS:
return {
...state,
posts: state.posts.concat(action.payload)
}
default:
return state;
}
}

export default reducer;
```
12. In `Counter.js`,add  `posts` to `mapStateToProps`, add `onFetchPosts` to `mapDispatchToProps`, and finally, add an onClick to the `Fetch Posts` button:

```javascript
...
<button onClick={this.props.onFetchPosts}>Fetch Posts</button>
<ul>
{this.props.posts.map( post => <li>{post.title}</li>)}
</ul>
</div>
...
const mapStateToProps = state => {
return {
ctr: state.rootCtr.counter,
log: state.rootLog.logCounter,
posts: state.rootPosts.posts,
}
};

const mapDispatchToProps = dispatch => {
return {
onIncrementCounter: () => dispatch(actionCreators.increment()),
onDecrementCounter: () => dispatch(actionCreators.decrement()),
onLog: () => dispatch(actionCreators.log()),
onFetchPosts: () => dispatch(actionCreators.fetchPosts()),
};
};

...
```

# End of "with-redux-advanced" branch

# End of "Redux" demo




