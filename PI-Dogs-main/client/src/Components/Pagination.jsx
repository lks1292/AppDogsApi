import React from "react";
import "../styles/pagination.css"

export default function Pagination({ dogsPerPage, allDogs, paginate }) {
  const pageNumbers = [];
  for (let i = 0; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i+1);
  }

    return (

        <nav>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <div key={number}>
            <button className="number" onClick={() => paginate(number)}>
              {number}
            </button>
          </div>
        ))}
      </div>
    </nav>
        // <nav>
        //     <ul className="Paginate">
        //         {pageNumbers && pageNumbers.map(number => (
        //             <li className="Number" key={number}>
        //                 <button onClick={() => paginate(number)}></button>
        //             </li>
        //         ))}
        //     </ul>
        // </nav>
    )
}