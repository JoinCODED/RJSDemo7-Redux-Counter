# RJSDemo5-Redux

# Steps for branches: "starting-point" to "with-redux"

1. Demonstrate the counter app and explain that the counters in both components are completely independent.

2. Restructure the app to use a shared state, passing methods as props. Make subcomponents functions.

3. Explain what a store is, and how it would change the structure of our app. Instead of internal states, we would have the app and its corresponding components connect to central store.

4. Show and explain the [Redux flow diagram](https://warehouse.joincoded.com/workshop/redux/intro-to-redux/the-redux-flow/).

5. `yarn add redux` and `yarn add react-redux`

# Adding Redux to the Project

6. In`index.js`, set up the App for redux:

   ```jsx
   import React from "react";
   import ReactDOM from "react-dom";
   import "./index.css";
   import App from "./App";
   import registerServiceWorker from "./registerServiceWorker";

   import { createStore } from "redux"; //STEP 1
   import { Provider } from "react-redux"; // STEP 2

   const store = createStore(() => {}); //STEP 3
   // createStore takes an empty function for now (for demoing purposes), but will be replaced with the actual reducer later

   //STEP 4
   ReactDOM.render(
     <Provider store={store}>
       <App />
     </Provider>,
     document.getElementById("root")
   );
   registerServiceWorker();
   ```

# Reducers

First, let's disconnect our components from the `App` state and connect them to a central store.

7. Create `stores/reducer.js` and inside that:

   ```javascript
   const initialState = {
     copyMe: "Remember to copy me!",
     counter: 0
   };

   const reducer = (state = initialState, action) => {
     return state;
   };

   export default reducer;
   ```

# Adding The Reducer to the Project

8. In`index.js`, add the reducer to the store:

   ```jsx
   ...
   import { createStore } from "redux";
   import { Provider } from "react-redux";
   import reducer from "./stores/reducer"; //STEP 5

   const store = createStore(reducer); //STEP 6

   ReactDOM.render(
     <Provider store={store}>
       <App />
     </Provider>,
     document.getElementById("root")
   );
   registerServiceWorker();
   ```

# Connect Component to Central Store

13. In `Incrementer.js` and `Decrementer.sj`:

    ```javascript

    import { connect } from react-redux;

    ...

    const mapStateToProps = state => {
      return {
        counter: state.counter,
      }
    };

    ...

    export default connect(mapStateToProps)(Incrementer/Decrementer);
    ```

    Now our components have access to the `counter` variable from the global store. The component can access the counter variable via its props.

    `{props.counter}`

    Change the initial value of the counter state in `stores/reducer.js` to show that we are not using the internal state anymore. In fact, delete the props being passed from `App.js`.

# Actions

Now we need actions that will modify the state...

14. Create `stores/actions.js` with:

    ```javascript
    export const increment = () => {
      alert("Increment");
    };

    export const decrement = () => {
      alert("Decrement");
    };
    ```

15. Time to use our actions!  
    Add and connect mapDispatchToProps  
    Show that these components are receiving these functions as props:

    `Incrementer.js`

    ```jsx

    import {increment} from './store/actions';
    import {connect} from "react-redux";

    ...

    const mapDispatchToProps = dispatch => {
      return {
        incrementCounter: () => dispatch(increment()),
      };
    };

    ...

    export default connect(mapStateToProps, mapDispatchToProps)(Incrementer); //null because the first argument takes a mapDispatchToState ... which we do not have yet.

    ```

    `Decrementer.js`

    ```jsx

    import {decrement} from '../../store/actions';
    import {connect} from "react-redux";
    ...
    const mapDispatchToProps = dispatch => {
      return {
        decrementCounter: () => dispatch(decrement()),
      };
    };

    export default connect(null, mapDispatchToProps)(Decrementer); //null because the first argument takes a mapDispatchToState ... which we do not have yet.

    ```

16. Now that our actions are wired, let us dispatch:

    ```jsx
    <button onClick={props.incrementCounter}>Increment</button>
    ```

    ```jsx
    <button onClick={props.decrementCounter}>Decrement</button>
    ```

    The action functions might be running, but they immediately crash and they definitely aren't modifying the store!

# Actions meet Reducer

We need the missing link...  
We have a central store and we have function that we can run in response to events. We just need to wire them together so that the functions MODIFY the store.

17. In `stores/action.js` let the functions return objects that specify the type of the actions:

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

18. Back in `stores/reducer.js` point out that the switch is recieving an `action` that we're not using. Log this to show that it's the object being returned by the actions!

19. Introduce a `switch` on `action.type` into the reducer that simply logs the type:

    ```javascript
    const reducer = (state = initialState, action) => {
      switch (action.type) {
        case "INCREMENT":
          alert("INCREMENT");
          return state;
        case "DECREMENT":
          alert("DECREMENT");
          return state;
        default:
          return state;
      }
    };
    ```

20. Stop wasting time and actually update the store!

    ```javascript
    const reducer = (state = initialState, action) => {
      switch (action.type) {
        case "INCREMENT":
          return {
            ...state,
            counter: state.counter + 1
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
    ```

# Payloads

The `increment` and `decrement` actions are very similar. They could be combined into a single function that receives a parameter.

21. In `stores/actions.js`, modify `increment` to take a param:

    ```javascript
    export const increment = step => {
      return {
        type: INCREMENT
      };
    };
    ```

22. In `Incrementer.js` and `Decrementer.js` pass a value to the action:

    ```javascript
    const mapDispatchToProps = dispatch => {
      return {
        incrementCounter: () => dispatch(increment(1))
      };
    };
    ```

23. Send the `step` as a `payload`. Show it being recieved in the reducer:

    ```javascript
    export const increment = step => {
      return {
        type: INCREMENT,
        payload: step
      };
    };
    ```

24. Use it in the reducer:

    ```javascript
    case "INCREMENT":
      return {
        ...state,
        counter: state.counter + action.payload
      };
    ```

# The Importance of Returning a Copying State

25. In `Incrementer.js`:

    ```javascript
    const mapStateToProps = state => {
      return {
        counter: state.counter,
        copyMe: state.copyMe
      };
    };
    ```

    Now our component has access to the `copyMe` variable in our global store. The component can access the counter variable via its props.

    `{props.copyMe}`

26. After displaying it on the screen, remove the spread operator from the decrement `reducer.js` to show that if we do not copy the older state, the values will get erased since they were not included in the new state.

    ```javascript
    const reducer = (state = initialState, action) => {
      switch (action.type) {
        case "INCREMENT":
          return {
            ...state,
            counter: state.counter + 1
          };
        case "DECREMENT":
          return {
            counter: state.counter - 1
          };

        default:
          return state;
      }
    };
    ```

# STOP HERE. GIVE THEM THE CORRESPONDING TASK. After demonstrating the solution, come back to explaining the below concepts before moving on to advanced-redux.

# Using Multiple Reducers

16. Add a new "Log" button that increments it's own counter, `logCounter`. In `reducer.js`:

```javascript
const initialState = {
  copyMe: "Remember to copy me!",
  counter: 0,
  logCounter: 0
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
    case "LOG":
      const logCounter = state.logCounter + 1;
      return {
        ...state,
        logCounter: logCounter
      };
    default:
      return state;
  }
};

export default reducer;
```

17. Seperate reducers by creating a `reducers` folder with `counter.js` and `log.js` inside. Now, inside `store/reducers/counter.js`:

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

Inside `store/reducers/log.js`:

```javascript
const initialState = {
  copyMe2: "Remember to copy me too!",
  logCounter: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG":
      const logCounter = state.logCounter + 1;
      return {
        ...state,
        logCounter: logCounter
      };
    default:
      return state;
  }
};
export default reducer;
```

18. Now, in `index.js`, combine the reducers:

```javascript
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
```

19. Back in `Counter.js`, remap the `mapStateToProps`:

```javascript
const mapStateToProps = state => {
  return {
    ctr: state.rootCtr.counter,
    log: state.rootLog.logCounter
  };
};
```

# End of "starting-point" branch

# Switch to "with-redux" branch to demo Advanced Redux
