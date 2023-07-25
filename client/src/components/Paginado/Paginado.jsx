import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from '../Paginado/Paginado.module.css';
import Card from "../Card/Card";
import { getVideogames, orderByName, orderByRating, filterByGenres, resetVideogames, filterGameByOrigin } from "../../redux/actions";


const Pagination = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
      dispatch(getVideogames())
  }, [dispatch])
  
  const videogames = useSelector( state => state.videogames)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPage, setSelectedPage] = useState(1)
  const [itemsPerPage] = useState(15)
  const lastGame = currentPage * itemsPerPage; 
  const firtsGame = lastGame - itemsPerPage
  const currentGames = videogames.slice(firtsGame,lastGame) 
  //console.log(videogames)
  
  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(videogames.length / itemsPerPage); i++) {
    pageNumbers.push({number:i, selected: i === selectedPage}); //pagina donde estoy
  }
  return pageNumbers;
};

const handlePrevPage = () => {
    setCurrentPage(currentPage - 1 );
    setSelectedPage(selectedPage - 1);
  };
  
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1 );
    setSelectedPage(selectedPage + 1);
  };
const pageNumbers = generatePageNumbers();
//--------------------- 
function handleSortName (event) {
  event.preventDefault();
  dispatch(orderByName(event.target.value))
  setCurrentPage(1)
  setSelectedPage(1)
}
function handleFilter(e) {
  dispatch(filterByGenres(e.target.value))
  setCurrentPage(1)
  setSelectedPage(1)
}
function handleSortRating (event) {
  event.preventDefault();
  dispatch(orderByRating(event.target.value))
  dispatch(handleFilter(event.target.value))
  setCurrentPage(1)
  setSelectedPage(1)
}


function handleFilterByOrigin (event) {
  dispatch(filterGameByOrigin(event.target.value))
  setCurrentPage(1)
  setSelectedPage(1)
}

function handleReset () {
    dispatch(resetVideogames());
    dispatch(getVideogames());
    setCurrentPage(1)
    setSelectedPage(1)
}

    return(
        
        <div className={style.Pagination}>
          <div className={style.container}>
          <select className={style.container} placeholder="Order" onChange={handleSortName}>
  <option className={style.selected} value="">Order by</option>
  <option key="Ascendente" value="Ascendente">A-Z</option>
  <option key="Descendente" value="Descendente">Z-A</option>
  </select>
  <select className={style.container} placeholder="Order" onChange={handleSortRating}>
  <option value="">Order by</option>
  <option  value="Ascendente">High Rating</option>
  <option  value="Descendente">Low Rating</option>
</select>
<select  className={style.container} onChange={handleFilterByOrigin}>
          <option value="All Videogames">All Videogames</option>
          <option value="Db">Videogame created</option>
          <option value="Api">Exist videogame</option>

          </select>  
       <select className={style.container} placeholder="Genres" onChange={e => handleFilter(e)}>
  <option value="All videogames">All genres</option>
  <option value="Action">Action</option>
  <option value="Indie">Indie</option>
  <option value="Adventure">Adventure</option>
  <option value="RPG">RPG</option>
  <option value="Strategy">Strategy</option>
  <option value="Shooter">Shooter</option>
  <option value="Casual">Casual</option>
  <option value="Simulation">Simulation</option>
  <option value="Puzzle">Puzzle</option>
  <option value="Arcade">Arcade</option>
  <option value="Platformer">Platformer</option>
  <option value="Massively-Multiplayer">Massively Multiplayer</option>
  <option value="Racing">Racing</option>
  <option value="Sports">Sports</option>
  <option value="Fighting">Fighting</option>
  <option value="Family">Family</option>
  <option value="Board-games">Board Games</option>
  <option value="Educational">Educational</option>
  <option value="Card">Card</option>
  
</select>
<button className={style.container} onClick={handleReset}>RESET</button>
</div>
            {
              videogames.length === 1
              ? ''
              : <div className={style.pageButtons}>
              <button className={style.unselected} onClick={handlePrevPage} disabled={currentPage === 1}>
                {"<"}
              </button>
              {pageNumbers.map((page) => (
                
                <button
                key={page.number}
                onClick={() => {
                setCurrentPage(page.number);
                setSelectedPage(page.number);
                }}
                className={`${style.pageButton} ${
                page.selected ? style.selected : style.unselected
                } ${page.number === selectedPage ? style.selected  :''}`}
                >
                {page.number}
                </button>
            ))}
              <button
                className={style.unselected}
                onClick={handleNextPage}
                disabled={lastGame >= videogames.length}
              >
                {">"}
              </button>
            </div>
            }
          {
            videogames.length > 1 
            ? <><h2 className={style.headerPagination}> Games: </h2></>
            : ''
          }
            <div className={style.cardsContainer}>
            
            {currentGames ?
                currentGames.map((game, index) => (
                  <Card
                    key={`${game.id}-${index}`} 
                    id={game.id}
                    image={game.image}
                    name={game.name}
                    genres={game.genres}
                    release={game.release}
                    rating={game.ratings}
                  /> 
               ))
              : 
              <div>Loading...</div>
              }
             
           </div>
           {
            lastGame >= videogames.length
            ? ''
            :  <div className={style.pageButtons}>
            <button className={style.unselected} onClick={handlePrevPage} disabled={currentPage === 1}>
              {"<"}
            </button>
            {pageNumbers.map((page) => (
              
              <button
              key={page.number}
              onClick={() => {
              setCurrentPage(page.number);
              setSelectedPage(page.number);
              }}
              className={`${style.pageButton} ${
              page.selected ? style.selected : style.unselected
              } ${page.number === selectedPage ? style.selected  :''}`}
              >
              {page.number}
              </button>
          ))}
            <button
              className={style.unselected}
              onClick={handleNextPage}
              disabled={lastGame >= videogames.length}
            >
              {">"}
            </button>
          </div>
          }
        
        </div>
    )
}
export default Pagination;

