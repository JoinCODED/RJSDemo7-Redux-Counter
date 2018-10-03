import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';


export const fetchPosts = () => {
    return (dispatch) => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(res => dispatch(getPosts(res.data)))
    }
}

export const getPosts = (posts) => {
    return {
        type: actionTypes.FETCH_POSTS,
        payload: posts
    }
}

