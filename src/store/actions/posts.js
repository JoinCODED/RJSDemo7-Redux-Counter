import * as actionTypes from "../actions/actionTypes";
import axios from "axios";

export const fetchPosts = () => {
  return dispatch => {
    //This function gets called by Redux Thunk
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.data)
      .then(posts =>
        dispatch({
          type: actionTypes.FETCH_POSTS,
          payload: posts
        })
      ); //Once we recieve a response, dispatch the action
  };
};

//UDPATE ON WH
