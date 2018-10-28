# RJSDemo5-Redux

# Steps for branches: "starting-point" to "with-redux"
0. Demonstrate the counter app and explain that the counter is being 
1. Explain what a store is, and how it would change the structure of our app. Instead of internal states, we would have the app and its corresponding components connect to central store. 
2. Show and explain the [Redux flow diagram](https://warehouse.joincoded.com/workshop/redux/intro-to-redux/the-redux-flow/). 
3. `yarn add redux` and `yarn add react-redux`
# Actions
4. Create `store` folder. In store, create `actions.js`
5. In `stores/action.js`:
```javascript
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";


export const increment = () => {
return {
type: INCREMENT,
}
}

export const decrement = () => {
return {
type: DECREMENT,
}
}
```
# Reducers
6. Create `stores/reducers.js` and inside that:
```javascript
const initialState = {
copyMe: "Remember to copy me!",
counter: 0,
}

const reducer = (state=initialState, action) => {
switch(action.type){
case 'INCREMENT':
return {
...state,
counter: state.counter + 1, //copy all of the old state, and only manipulate the part we want to 
manipulate.
}
case 'DECREMENT':
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
# Adding Redux to the Project
7. In`index.js`, set up the App for redux:
```javascript 

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {createStore} from 'redux'; //STEP 1
import {Provider} from 'react-redux'; // STEP 2
import reducer from './store/reducer' //STEP 3

const store = createStore(reducer); //STEP 4

//STEP 5
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();

```
# Connect Component to Central Store
8. In `Counter.js`:

```javascript

import {connect} from react-redux;

...

const mapStateToProps = state => {
return {
ctr: state.counter, 
}
};

...

export default connect(mapStateToProps)(Counter);
```
Now our component has access to the "counter" variable in our global store. The component can access the counter variable via its props.

`{this.props.ctr}`


# Actions - Wiring 
8.  Time to dispatch actions! In `Counter.js`:
```javascript
....
const mapStateToProps = ....
const mapDispatchToProps = dispatch => {
return {
onIncrementCounter: () => dispatch({type: "INCREMENT"}),
onDecrementCounter: () => dispatch({type: "DECREMENT"})),
};
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

```
# Actions - Dispatching
9. Now that our actions are wired, let us dispatch:

```javascript
<button onClick={this.props.onIncrementCounter}>Increment</button>
<button onClick={this.props.onDecrementCounter}>Decrement</button>
```

10. Import the `actionCreators` and show them the benefit of using them. That is: to keep code organized and avoid mispelled actions:

```javascript
import * as actionCreators from '../../store/actions';
...
...
const mapDispatchToProps = dispatch => {
return {
onIncrementCounter: () => dispatch(actionCreators.increment()),
onDecrementCounter: () => dispatch(actionCreators.decrement()),
};
};
...
```

# Using Multiple Reducers

11. Add a new "Log" button that increments it's own counter, `logCounter`. In `reducer.js`:

```javascript
const initialState = {
copyMe: "Remember to copy me!",
counter: 0,
logCounter: 0,
}

const reducer = (state=initialState, action) => {
switch(action.type){
case 'INCREMENT':
return {
...state,
counter: state.counter + 1, //copy all of the old state, and only manipulate the part we want to 
manipulate.
}
case 'DECREMENT':
return {
...state,
counter: state.counter - 1,
}
case 'LOG':
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
12. Seperate reducers by creating a `reducers` folder with `counter.js` and `log.js` inside. Now, inside `store/reducers/counter.js`:

```javascript
const initialState = {
copyMe: "Remember to copy me!",
counter: 0,
}

const reducer = (state=initialState, action) => {
switch(action.type){
case 'INCREMENT':
return {
...state,
counter: state.counter + 1, //copy all of the old state, and only manipulate the part we want to 
manipulate.
}
case 'DECREMENT':
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
Inside `store/reducers/log.js`:
```javascript
const initialState = {
copyMe2: "Remember to copy me too!",
logCounter: 0,
}

const reducer = (state=initialState, action) => {
switch(action.type){
case 'LOG':
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

12. Now, in `index.js`, combine the reducers: 
```javascript
import {Provider} from 'react-redux';

import {createStore, combineReducers} from 'redux'; //STEP 1
import counterReducer from './store/reducers/counter'; //STEP 2
import logReducer from './store/reducers/log'; // STEP 2


//STEP 3
const rootReducer = combineReducers({
rootCtr: counterReducer,
rootLog: logReducer,
});


const store = createStore(rootReducer); //STEP 4

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
```
13. Back in `Counter.js`, remap the `mapStateToProps`:
```javascript
const mapStateToProps = state => {
return {
ctr: state.rootCtr.counter,
log: state.rootLog.logCounter,
}
};
```

# End of "with-redux" branch
# Switch to "with-redux" branch to demo Advanced Redux


