import React, {useEffect, useState} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorModal from '../UI/ErrorModal';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      setIngredients(ings);
    })
  }, [setIngredients])
  const addIngredientsHandler = ingredient => {

    setLoading(true);
    fetch('https://react-hooks-5ffb0-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(ingredient)
    }).then(resp => {
      return resp.json();
    }).then(resp => {
      console.log(resp);
      setIngredients(prevIngredients => [...prevIngredients, {id: resp.name, ...ingredient}]);
      setLoading(false);
    }).catch(err => {
      setError(err);
      setLoading(false);
    });
  }
  const modalClosed = () => {
    setError(null);
  }
  const removeItem = (id) => {
    setIngredients(ingredients.filter((v) => v.id !== id));
  }
  return (
    <div className="App" style={{textAlign: 'center'}}>
      {error ? <ErrorModal onClose={modalClosed}>Error!</ErrorModal> : null}
      {loading ? <LoadingIndicator /> : <IngredientForm onAddIngredient={addIngredientsHandler} />}
      <section>
        <Search onSetIngredients={setIngredients}/>
        <IngredientList ingredients={ingredients} onRemoveItem={removeItem} />
      </section>
    </div>
  );
}

export default Ingredients;
