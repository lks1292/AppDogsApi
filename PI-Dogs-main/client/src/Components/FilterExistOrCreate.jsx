import {  useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDogs, getDb, getApi } from "../Actions";



   

function CreatedOrExist() {
    const [filtrado, setFiltrado] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {

        if(filtrado === "created"){
            dispatch(getDb()); 
        }

      if(filtrado === "all"){
            dispatch(getDogs()); 
      }

      if(filtrado === ""){
            dispatch(getDogs()); 
      }

      if(filtrado === "api"){
            dispatch(getApi()); 
      }
      
    }, [filtrado, dispatch]);


return (
<div>

    <select onChange={(e) => setFiltrado(e.target.value)} className='Filters'>
    <option value ="">Filter By Origin</option>
    <option>All</option>
    </select>
</div>


)}

export default CreatedOrExist