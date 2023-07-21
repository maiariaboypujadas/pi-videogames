import { useDispatch} from "react-redux";
import { useState } from "react";
import { getVideogamesByName} from "../../redux/actions";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {resetVideogames, getVideogames} from "../../redux/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  
  const [name, setName] = useState("");

  function changeHandlerSearch(event) {
    event.preventDefault();
    setName(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
      dispatch(getVideogamesByName(name));
    
  };
  function handleReset () {
    dispatch(resetVideogames());
    dispatch(getVideogames());
}
  return (
    <div className="#buscador">
      <form className="search-container" >
        <input
          type="text"
          placeholder="Search..."
          onChange={changeHandlerSearch}
          value={name}
        />
        <button onClick={handleSubmit} type="submit">SEARCH</button>
        <button onClick={handleReset}>
        <Link className='search-container' to="home">GO BACK</Link>
        </button>
      </form>
      
    </div>
  );
}