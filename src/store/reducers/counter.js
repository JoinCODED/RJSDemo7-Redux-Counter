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
