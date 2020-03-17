import { SET_POSTS } from "../actionCreators/actionTypes";

const initialState = { posts: [] };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_POSTS:
      return {
        ...state,
        posts: payload
      };

    default:
      return state;
  }
};
