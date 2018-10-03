import * as actionTypes from '../actions/actionTypes';

const initialState = {
    copyMe3: "Remeber to copy me!",
    posts: [],
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_POSTS:
            return {
                ...state,
                posts: state.posts.concat(action.payload)
            }
        default:
            return state;

    }
}

export default reducer;