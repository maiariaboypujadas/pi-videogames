import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from '../Paginado/Paginado.module.css';
//import Loading from "../Loading/Loading";
import Card from "../Card/Card";
import { getVideogames } from "../../redux/actions";


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
  console.log(videogames)
  
  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(videogames.length / itemsPerPage); i++) {
    pageNumbers.push({number:i, selected: i === selectedPage});
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

    return(
        
        <div className={style.Pagination}>

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
              //<Loading/>
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

