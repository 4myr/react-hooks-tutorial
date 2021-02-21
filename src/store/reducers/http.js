
const httpReducer = (state, action) => {
    switch(action.type) {
        case 'SEND':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'RESPONSE':
            return {
                ...state,
                loading: false,
                error: null
            };
        case 'ERROR':
            return {
                ...state,
                loading: false,
                error: action.err
            };
        case 'CLEAR':
            return {
                ...state,
                error: null
            }
        default: return state;
    }
}

export default httpReducer;