import { INCREMENT } from "../actionCreators/actionTypes";

const initialState = {
  counter: 0
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + payload
      };

    default:
      return state;
  }
};
