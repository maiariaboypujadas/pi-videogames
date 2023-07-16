import { useDispatch} from "react-redux";
import { useState } from "react";
import { getVideogamesByName} from "../../redux/actions";


export default function SearchBar() {
  const dispatch = useDispatch();
  
  const [name, setName] = useState("");

  function changeHandlerSearch(event) {
    event.preventDefault();
    setName(event.target.value.toLowerCase());
  }
  const handleSubmit = (event) => {
    event.preventDefault();
      dispatch(getVideogamesByName(name));
    
  };
  return (
    <div className="search-container">
      <form >
        <input
          type="text"
          placeholder="Search..."
          onChange={changeHandlerSearch}
          value={name}
        />
        <button onClick={handleSubmit} type="submit">SEARCH</button>
      </form>
      
    </div>
  );
}