import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogames } from '../../redux/actions';
//import Cards from '../../components/Cards/Cards';
import SearchBar from '../../components/SearchBar/SearchBar';
import Pagination from '../../components/Paginado/Paginado';


function Home() {
  const dispatch = useDispatch();
  //const videogames = useSelector((state) => state.videogames);

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);
//----------------
 
  return (
    <>
      <h1>List of Videogames</h1>
      <SearchBar />
      <Pagination>

      </Pagination>
    {/* {<Cards videgames={videogames} /> } */}
  
      <hr></hr>
    </>
  );
}

export default Home;
