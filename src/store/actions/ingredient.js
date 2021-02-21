import * as actionTypes from './actionTypes';

export const addIngredient = (ingredient) => {
    return {
        type: actionTypes.ADD,
        ing: ingredient
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET,
        ings: ingredients
    }
}

export const deleteIngredient = (id) => {
    return {
        type: actionTypes.DELETE,
        id: id
    }
}