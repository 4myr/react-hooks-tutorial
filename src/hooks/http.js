import { useCallback, useReducer } from 'react';

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
            error: null,
            data: action.responseData
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
const useHttp = () => {
    const [http, httpDispatch] = useReducer(httpReducer, {
        loading: false,
        error: null,
        data: null
    });
    const sendRequest = useCallback((url, method, body) => {
        httpDispatch({type: 'SEND'});
        fetch(url, {
          method: method,
          headers: {'Content-Type': 'application/json'},
          body: body
        }).then(resp => {
          return resp.json();
        }).then(resp => {
          httpDispatch({type: 'RESPONSE', responseData: resp});
        }).catch(err => {
          httpDispatch({type: 'ERROR', err: err});
        });
    }, []);

    return {
        isLoading: http.loading,
        data: http.data,
        error: http.error,
        sendRequest: sendRequest

    }
}

export default useHttp;