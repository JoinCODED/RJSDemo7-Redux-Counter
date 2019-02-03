import * as actionTypes from "../actions/actionTypes";
import axios from "axios";

export const fetchPosts = () => {
  return async dispatch => {
    //This function gets called by Redux Thunk
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      const posts = res.data;

      dispatch({
        //Once we recieve a response, dispatch the action
        type: actionTypes.FETCH_POSTS,
        payload: posts
      });
    } catch (err) {
      console.error(err);
    }
  };
};
