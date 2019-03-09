# RJSDemo5-Redux

# Steps for branches: "starting-point" to "with-redux"

1. Demonstrate the counter app and explain that the counter is being
2. Explain what a store is, and how it would change the structure of our app. Instead of internal states, we would have the app and its corresponding components connect to central store.
3. Show and explain the [Redux flow diagram](https://warehouse.joincoded.com/workshop/redux/intro-to-redux/the-redux-flow/).
4. `yarn add redux` and `yarn add react-redux`

# Actions

5. Create `store` folder. In store, create `actions.js`
6. In `stores/action.js`:

```javascript
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

export const increment = () => {
  return {
    type: INCREMENT
  };
};

export const decrement = () => {
  return {
    type: DECREMENT
  };
};
```

# Reducers

6. Create `stores/reducers.js` and inside that:

```javascript
const initialState = {
  copyMe: "Remember to copy me!",
  counter: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        counter: state.counter + 1 //copy all of the old state, and only manipulate the part we want to manipulate.
      };
    case "DECREMENT":
      return {
        ...state,
        counter: state.counter - 1
      };
    default:
      return state;
  }
};

export default reducer;
```

# Adding Redux to the Project

7. In`index.js`, set up the App for redux:

```javascript
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { createStore } from "redux"; //STEP 1
import { Provider } from "react-redux"; // STEP 2
import reducer from "./store/reducer"; //STEP 3

const store = createStore(reducer); //STEP 4

//STEP 5
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
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
    onDecrementCounter: () => dispatch({type: "DECREMENT"}))
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
# End of "with-redux" branch

# Switch to "with-redux" branch to demo Advanced Redux
