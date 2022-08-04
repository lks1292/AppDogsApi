import axios from 'axios';
import { useDispatch } from 'react-redux';

export function getDogs(){
    return async function(dispatch){
        
            const response = await axios.get('http://localhost:3001/dogs');
           dispatch({type: 'GET_DOGS', payload: response.data});
        
        
    }
}

export function getTemperaments(){
    return async function(dispatch){
        
            const response = await axios.get('http://localhost:3001/temperament');
          dispatch({type: 'GET_TEMPERAMENTS', payload: response.data});
        
        
    }
}

export function getDb(){
    return async function(dispatch){
        
            const response = await axios.get('http://localhost:3001/database');
          dispatch({type: 'GET_DB', payload: response.data});
        
        
    }
}

export function getApi(){
    return async function(dispatch){
        
            const response = await axios.get('http://localhost:3001/Api');
          dispatch({type: 'GET_API', payload: response.data});
        
        
    }
}

export function getDetails(id){
    return async function(dispatch){
        
            const response = await axios.get(`http://localhost:3001/dogs/${id}`);
          dispatch({type: 'GET_DETAILS', payload: response.data});
        
        
    }
}

export function filterByTemperament (){
    return async function(dispatch){
        
            const response = await axios.get(`http://localhost:3001/temperament`);
          dispatch({type: 'FILTER_BY_TEMPERAMENT', payload: response.data});
            
        
    }
}

export function getDogsByName(){
//  return async (dispatch, name) => {
//         const response = await axios.get(`http://localhost:3001/dogs/${name}`);
//         dispatch({type: 'GET_DOGS_BY_NAME', payload: response.data});
//  }

return async (name)=>{
    const dispatch= useDispatch()
    const response = await axios.get(`http://localhost:3001/dogs/${name}`)
    dispatch({type:'GET_DOGS_BY_NAME', payload: response.data})
}
}

// export function filterByWeight (payload){
//     return {
//         type: "FILTER_BY_WEIGHT",
//         payload,
//     }
// }

export function filterByAz (payload){
    return { 
        type: 'FILTER_BY_NAME',
        payload,
    }
}

export const reset = () => dispatch => {
    return dispatch({
        type: "RESET",
    })
}

