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
