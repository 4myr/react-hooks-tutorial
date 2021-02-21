import * as actionTypes from '../actions/actionTypes';

const ingredientReducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.SET:
            return action.ings;
        case actionTypes.ADD:
            state.push(action.ing);
            return state;
        case actionTypes.DELETE:
            return state.filter((ing) => {
                return action.id !== ing.id
            });
        default: return state;
    }
};

export default ingredientReducer;