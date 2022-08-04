import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDogs, getTemperaments, filterByAz} from '../Actions/index'
import Card from "./Card";
import Pagination from "./Pagination";
import NavBar from "./NavBar";
//import componentFilters from "./FilterComp";
import CreatedOrExist from "./FilterExistOrCreate";
import byTemperament from "./FilterTemperament";

import '../styles/Home.css';
//import SearchBar from "./searchBar";


export default function Home(){
    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.dogs);
    const [loading, setLoading] = useState(false);
    const [order ,setOrder] = useState("")
    
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(8)

    const indexOfLastDogs = currentPage * dogsPerPage
    const indexOfFirstDogs = indexOfLastDogs - dogsPerPage
    const currentDog = allDogs.slice(indexOfFirstDogs, indexOfLastDogs)

    const paginate = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }



    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
        setLoading(true)
    },[dispatch]);


    // function filterTemperament(e){
    //     e.preventdefault()
    //     dispatch(filterByTemperament())
    // }


 
    function handlerFilter (e){
        dispatch(byTemperament(e.target.value))
        setCurrentPage(1)
        setOrder("Order" + e.target.value)
    }
    
    // function handlerByWeight(e){
    //     //e.preventdefault()
    //     dispatch(filterByWeight(e.target.value))
    //     setCurrentPage(1)
    //     setOrder("Order" + e.target.value)
    // }

    function handleByAz(e){
        // e.prevendefault()
        dispatch(filterByAz(e.target.value));
        setCurrentPage(1)
        setOrder("Order" + e.target.value)
    }
    
    
    return(
        <div className="Component-general">
            <NavBar />
            {/* <SearchBar /> */}
            {/* <byTemperament/> */}

            <div className="FilterComponents">
        
        
         
            <div className="filterAz">
                <select onChange={(e)=> handleByAz(e)} placeholder="Filter By Alphabetic">
                    {/* <option value="" ></option> */}
                    <option value="a-z">A-Z</option>
                    <option value="z-a">Z-A</option>
                </select>
            </div>

            {/* <div className="filterByweight">
                <select onChange={(e)=> handlerByWeight(e)} className='weightFilter'>
                <option value="">Filter Weight</option>
                <option value="Ascendente-Descendente">Ascendente-Descendente</option>
                <option value="Descendente-Ascendente">Descendente-Ascendente</option>
                </select>
                 */}
            {/* </div> */}

            <div></div>
        </div>
           {currentDog.length > 0 ?
           <div className="1">
             <CreatedOrExist/>
               {/* <Pagination dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginate={paginate}/> */}
               
            {currentDog.map(d=>{
                return(
                    (<Card key={d.id} id={d.id}
                                    name={d.name} image={d.image}
                                     temperament={
                                         d.temperament
                                         ? d.temperament : d.temperaments
                                         ? d.temperaments.map(t => t.name + (' '))
                                         : (
                                         <></>
                                     )}
                                     weight={d.weight ? d.weight[0] : d.weight_min}/>)
                )
            })}
             <Pagination dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginate={paginate}/>
           
           </div>


           :
           <div>
               
                <h1>Loading...</h1>
           </div>
           
        }

        </div>
        // <div className="Card">
        //     <div>{currentDog.length>0
            
            
        //     }
            
        //     </div>
        //     <h1> PI DOGS</h1>
        //     {/* <NavBar/> */}
        //     <button onClick={e => {
        //      handlerClick(e)
        //   }}
        //   className='homeButton'
        //   id="reloadBtn"
        // >
        //   Reload All Dogs
        // </button>
        //    {
        //       allDogs?.map(d => {
        //          return(
                     
        //          (<Card key={d.id} id={d.id}
        //             name={d.name} image={d.image}
        //              temperament={
        //                  d.temperament
        //                  ? d.temperament : d.temperaments
        //                  ? d.temperaments.map(t => t.name + (' '))
        //                  : (
        //                  <></>
        //              )}
        //              weight={d.weight ? d.weight[0] : d.weight_min}/>)
        //       )})
        //    }
        //    <Pagination
        //    dogsPerPage={dogsPerPage}
        //    allDogs={allDogs.length}
        //    paginate={paginate}
        //    />
        // </div>
        
        )
        
    }
    