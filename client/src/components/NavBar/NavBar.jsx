import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { filterByGenres, orderByName, resetVideogames, orderByRating, getVideogames, filterGameByOrigin } from "../../redux/actions";


function NavBar () { 
    const dispatch = useDispatch();
    function handleSort (event) {
      event.preventDefault();
        dispatch(orderByName(event.target.value))
        dispatch(orderByRating(event.target.value))
      }
    
    function handleFilter (event) {
        dispatch(filterByGenres(event.target.value))
    }
    function handleFilterByOrigin (event) {
      dispatch(filterGameByOrigin(event.target.value))
  }
    function handleReset () {
        dispatch(resetVideogames());
        dispatch(getVideogames());

    }
    return (
        <div className="navContainer">
         <select onChange={handleFilterByOrigin}>
          <option value="All Videogames">All Videogames</option>
          <option value="Db">Videogame created</option>
          <option value="Api">Exist videogame</option>

          </select>  
       <select placeholder="Genres" onChange={handleFilter} className="select">
  <option value="All videogames">All genres</option>
  <option value="action">Action</option>
  <option value="indie">Indie</option>
  <option value="adventure">Adventure</option>
  <option value="rpg">RPG</option>
  <option value="strategy">Strategy</option>
  <option value="shooter">Shooter</option>
  <option value="casual">Casual</option>
  <option value="simulation">Simulation</option>
  <option value="puzzle">Puzzle</option>
  <option value="arcade">Arcade</option>
  <option value="platformer">Platformer</option>
  <option value="massively-multiplayer">Massively Multiplayer</option>
  <option value="racing">Racing</option>
  <option value="sports">Sports</option>
  <option value="fighting">Fighting</option>
  <option value="family">Family</option>
  <option value="board-games">Board Games</option>
  <option value="educational">Educational</option>
  <option value="card">Card</option>
</select>

<select placeholder="Order" onChange={handleSort}>
  <option value="">Order by</option>
  <option key="Ascendente" value="Ascendente">A-Z</option>
  <option key="Descendente" value="Descendente">Z-A</option>
  <option  value="Ascendente">High Rating</option>
  <option  value="Descendente">Low Rating</option>
</select>


<button onClick={handleReset}>RESET</button>
<div className="navContainer">
            <Link to="/home">HOME</Link>
            <Link to="/create">FORM</Link>
            <Link to="/about">ABOUT</Link>

</div>
        </div>
    )
}

export default NavBar;