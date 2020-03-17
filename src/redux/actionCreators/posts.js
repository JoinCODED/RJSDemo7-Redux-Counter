import axios from "axios";

import { SET_POSTS } from "./actionTypes";

export const fetchPosts = () => {
  return async dispatch => {
    //This function gets called by Redux Thunk
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const posts = res.data;
    dispatch({
      type: SET_POSTS,
      payload: posts
    });
  };
};
