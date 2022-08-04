import React from "react";
import {Link} from "react-router-dom"
import SearchBar from "./searchBar";
import './nav.css'

export default function NavBar(){

    return (
        <div className="Nav">
            <SearchBar/>
            <Link className="AllDogs" to ='/'>Home</Link>
            <Link className="CreateDog">CreateDog</Link>
        </div>
    )
}