const initialState = {
    copyMe2: "Remember to copy me too!",
    logCounter: 0,
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case 'LOG':
        const logCounter = state.logCounter + 1;
        return {
            ...state,
            logCounter: logCounter,
        }
        default:
            return state;
    }
}

export default reducer;