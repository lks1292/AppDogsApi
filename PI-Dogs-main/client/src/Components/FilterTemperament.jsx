import React from "react";
import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByTemperament  } from "../Actions";

const ByTemperament =()=>{
    const dispatch = useDispatch();
    const temperament = useSelector(state => state.temperament);

useEffect((dispatch) => {
    dispatch(filterByTemperament());
},[]);

const handleTemperament = (e)=>{
    e.preventdefault()
    dispatch(filterByTemperament(e.target.value))
}

return (
    <div>
        <select onChange={handleTemperament}>
            <option value="">Filter Temperaments</option>
            <option>All Temperament</option>
            {
                temperament && temperament.map(t => {
                    return(
                        <option key={t.id} value={t.name}>{t.name}</option>
                    )
                })
            }
        </select>
    </div>
)
}

export default ByTemperament;