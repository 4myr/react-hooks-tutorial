import React, {useEffect, useRef, useState} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const [filter, setFilter] = useState('')
  const { onSetIngredients } = props;
  const inputRef = useRef();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filter === inputRef.current.value && filter.length > 0) {
        const params = filter ? '?orderBy="title"&equalTo="' + filter + '"' : '';
        fetch('https://react-hooks-5ffb0-default-rtdb.firebaseio.com/ingredients.json' + params, {
          method: 'GET'
        }).then(resp => resp.json()).then(resp => {
          const ings = [];
          for (let key in resp) {
            ings.push(resp[key]);
          }
          onSetIngredients(ings);
        })
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    }
  }, [filter, onSetIngredients, inputRef]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" ref={inputRef} onChange={(event) => setFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
