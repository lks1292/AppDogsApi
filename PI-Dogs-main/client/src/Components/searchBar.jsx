import React ,{useState} from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../Actions";


const SearchBar = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState("");

    const handleSumbit = (e) => {
        e.preventDefault();
        dispatch(getDogsByName(state));
        
    }
    const handleChange = (e) => {
        setState(e.target.value);
    }
    return (
        <div className="searchBar">
            <form onSubmit={handleSumbit}>
                <input type="text" onChange={handleChange} placeholder="Search by name" />
                <button type="submit">Search</button>
            </form>
        </div>
    )

}


export default SearchBar;