import React, {useCallback, useEffect, useReducer, useState, useMemo} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorModal from '../UI/ErrorModal';
import ingredientReducer from '../../store/reducers/ingredient';
import httpReducer from '../../store/reducers/http';
import * as ingredientActions from '../../store/actions/ingredient';
import useHttp from '../../hooks/http';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [ings, dispatch] = useReducer(ingredientReducer, []);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [http, httpDispatch] = useReducer(httpReducer, {
  //   loading: false,
  //   error: null
  // })
  const { isLoading, data, error, sendRequest } = useHttp();
  useEffect(() => {
    fetch('https://react-hooks-5ffb0-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'GET'
    }).then(resp => resp.json()).then(resp => {
      const ings = [];
      for (let key in resp) {
        const ing = {
          id: key,
          ...resp[key]
        };
        ings.push(ing);
      }
      dispatch(ingredientActions.setIngredients(ings));
    })
  }, [])
  const addIngredientsHandler = useCallback(ingredient => {
    sendRequest('https://react-hooks-5ffb0-default-rtdb.firebaseio.com/ingredients.json', 'POST', JSON.stringify(ingredient));
    if (data) {
      dispatch(ingredientActions.addIngredient({
        id: data.name,
        ...ingredient
      }))
    }
  }, [sendRequest, data]);
  const modalClosed = useCallback(() => {
    // httpDispatch({type: 'CLEAR'});
  });
  const removeItem = (id) => {
    // setIngredients(ingredients.filter((v) => v.id !== id));
    dispatch(ingredientActions.deleteIngredient(id));
  }
  const ingredientList = useMemo(() => {
    return (
      <IngredientList ingredients={ings} onRemoveItem={removeItem} />
    );
  }, [ings, removeItem]);
  return (
    <div className="App" style={{textAlign: 'center'}}>
      {error ? <ErrorModal onClose={modalClosed}>Error!</ErrorModal> : null}
      {isLoading ? <LoadingIndicator /> : <IngredientForm onAddIngredient={addIngredientsHandler} />}
      <section>
        <Search onSetIngredients={setIngredients}/>
        { ingredientList }
      </section>
    </div>
  );
}

export default Ingredients;
