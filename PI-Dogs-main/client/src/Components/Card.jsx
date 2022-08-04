import React from "react";
//import { Link } from "react-router-dom";
import "../styles/StyleCard.css";

export default function Card({ name, image, temperament, weight, id}) {

    return(
        <div key={id} className='contenedor-card'>
            <h3>{name}</h3>
            <h5>Temperament: {temperament}</h5>
            <h5>Weight: {weight} kg</h5>
            <img src={image} alt="Img not fount" width="200px" height="250px"/>
            <br/>
            {/* <Link to={`/${id}`}>Details</Link> */}
        </div>
    )

}