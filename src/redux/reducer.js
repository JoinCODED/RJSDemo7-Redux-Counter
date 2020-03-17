const initialState = {
  counter: 0,
  posts: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        counter: state.counter + action.payload
      };
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
