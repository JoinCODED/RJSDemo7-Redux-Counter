# RJSDemo7-Redux

# Steps for branches: "starting-point" to "with-redux"

1. Demonstrate the counter app and explain that the counters in both components are completely independent.

2. Restructure the app to use a shared state, passing methods as props. Make subcomponents functions.

3. Explain what a store is, and how it would change the structure of our app. Instead of internal states, we would have the app and its corresponding components connect to central store.

4. Show and explain the [Redux flow diagram](https://i.imgur.com/BK4FlTy.png).

5. `yarn add redux` and `yarn add react-redux`

# Part One: Setting up a Central Store

First, let's disconnect our components from the `App` state and connect them to a central store.

6. In `index.js`, create a redux store with a `counter` state. Wrap the `App` in a `Provider` and pass it the store:

   ```jsx
   import React from "react";
   import ReactDOM from "react-dom";
   import "./index.css";
   import App from "./App";
   import registerServiceWorker from "./registerServiceWorker";

   import { createStore } from "redux"; //STEP 1
   import { Provider } from "react-redux"; // STEP 2

   const store = createStore(() => {
     return {
       counter: 0
     };
   }); //STEP 3
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

7. In `Incrementer.js` and `Decrementer.sj`:

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

   Change the initial value of the counter state in `store` to show that we are not using the internal state anymore. In fact, delete the props being passed from `App.js`.

# Part Two: Defining a Reducer

The function we're passing to `createStore` is called a reducer. It can do more than just return a static state. It gets called to **update** the state. It does this by returning a **new** state, based on the old state. It can get pretty complex, so let's move it into its own file.

8. Create `redux/reducer.js` and inside that:

   ```javascript
   const initialState = {
     copyMe: "Remember to copy me!", // We'll talk about this later
     counter: 0
   };

   // Discuss the "signature" of a reducer: (state, actions) => newState
   const reducer = (state = initialState, action) => {
     return state; // simple reducer at first
   };

   export default reducer;
   ```

9. In`index.js`, add the reducer to the store - show everything is still connected by manually changing initial state:

   ```jsx
   ...
   import { createStore } from "redux";
   import { Provider } from "react-redux";
   import reducer from "./redux/reducer"; //STEP 5

   const store = createStore(reducer); //STEP 6

   ReactDOM.render(
     <Provider store={store}>
       <App />
     </Provider>,
     document.getElementById("root")
   );
   registerServiceWorker();
   ```

# Part Three: Dispatching and Handling Actions

10. `store.dispatch` accepts an action (object) and passes it to the reducer along with the current state. Use it manually to show the `state` and `action`:

    `redux/reducer.js`

    ```jsx
    const reducer = (state = initialState, action) => {
      console.log("reducer state", state);
      console.log("reducer action", action);
      return state; // simple reducer at first
    };
    ```

    `index.js`

    ```jsx
    ...
    const store = createStore(reducer);

    store.dispatch() // First - crashes - has to be an object
    store.dispatch({hello: "hello?"}) // Second - crashes - has to have a type
    store.dispatch({type: "hello?"}) // Third - works
    ...
    ```

11. The reducers job is to update the `state` in response to different types of actions. Let's do something slightly more useful:

    `index.js`

    ```jsx
    ...
    store.dispatch({type: "INCREMENT"})
    store.dispatch({type: "INCREMENT"}) // dispatch twice to show that state is being preserved on every call
    ...
    ```

    `redux/reducer.js`

    ```jsx
    const reducer = (state = initialState, action) => {
      console.log("reducer state", state);
      console.log("reducer action", action);
      if (action.type === "INCREMENT") return { counter: state.counter + 1 }; // Has to return a COMPLETELY NEW OBJECT
      return state; // simple reducer at first
    };
    ```

12. We want to dispatch in response to user events. We can use `mapDispatchToProps`:

    `Incrementer.js`

    ```jsx
    ...

    <button
      className="btn btn-lg btn-outline-dark"
      onClick={this.props.incrementCounter}  // STEP 3
    >
      Increment
    </button>

    ...

    /* *****************
     * STEP 1
     * Explain that this function gets passed `store.dispatch`
     * and returns an object with methods that dispatch actions
     * which get passed to the component as props
     * ****************/
    const mapDispatchToProps = dispatch => {
      return {
        incrementCounter: () => dispatch({type: "INCREMENT"})
      }
    }

    export default connect(mapStateToProps, mapDispatchToProps)(Incrementer); // STEP 2
    ```

    Repeat the above for `DECREMENT` - reducer + mapDispatchToProps + event handler

13. Clean up the reducer with a `switch` statement:

    `redux/reducer.js`

    ```jsx
    const reducer = (state = initialState, action) => {
      switch (action.type) {
        case "INCREMENT":
          return {
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

# Part Four: Action Creators

It's unusual that you'll build and dispatch action objects directly in `mapDispatchToProps`. The `INCRMENT` action is very simple but things can get messy once you start doing more complicated things to _create_ the action e.g. axios requests. We can define functions that _create_ and return actions called actionCreators:

14. Create `redux/actionCreators.js` with:

    ```javascript
    export const increment = () => {
      return { type: "INCREMENT" };
    };

    export const decrement = () => {
      return { type: "DECREMENT" };
    };
    ```

15. Import the actionCreators into the components and use them in `mapDispatchToProps`:

    `Incrementer.js`

    ```jsx

    import {connect} from "react-redux";

    // Action Creators
    import {increment} from './redux/actionCreators';

    ...

    const mapDispatchToProps = dispatch => {
      return {
        incrementCounter: () => dispatch(increment()),
      };
    };

    ...

    export default connect(mapStateToProps, mapDispatchToProps)(Incrementer);

    ```

    `Decrementer.js`

    ```jsx

    import {connect} from "react-redux";

    // Action Creators
    import {decrement} from '.redux/actionCreators';
    ...
    const mapDispatchToProps = dispatch => {
      return {
        decrementCounter: () => dispatch(decrement()),
      };
    };

    export default connect(mapStateToProps, mapDispatchToProps)(Decrementer);

    ```

# Part Five: Payloads

The `increment` and `decrement` actionCreators are very similar. They could be combined into a single function that receives a parameter.

21. In `redux/actionCreators.js`, modify `increment` to take a param:

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
        counter: state.counter + action.payload
      };
    default:
      return state;
    ```

# Misc

## The Importance of Returning a Copying State

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

26. After displaying it on the screen, click the button and show that the `copyMe` state gets erased. This is because whatever the reducer returns becomes the **NEW STATE**. Fix it the stupid way first:

    ```javascript
    case "INCREMENT":
      return {
        copyMe: state.copyMe,
        counter: state.counter + action.payload
      };
    ```

    What if you have a lot of state properties?
    What if you have a lot of different types of actions?
    Are you going to manually copy the state every time?

27. Explain then use the spread operator:

    ```javascript
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
    ```

## `mapDispatchToProps` without `mapStateToProps`:

28. Move the `counter` state and display to `App`. Now `Incrementer` and `Decrementer` don't need `mapStateToProps`. Pass `null` to `connect`:

```javascript
export default connect(null, mapDispatchToProps)(Decrementer);
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
