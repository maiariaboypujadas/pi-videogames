import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getGenres, getVideogames } from '../../redux/actions';
//import Cards from '../../components/Cards/Cards';
import SearchBar from '../../components/SearchBar/SearchBar';
import Pagination from '../../components/Paginado/Paginado';


function Home() {
  const dispatch = useDispatch();
  //const videogames = useSelector((state) => state.videogames);

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres())
  }, [dispatch]);
//----------------
 
  return (
    <div className='App'>

      <SearchBar />
      <h1>List of Videogames</h1>
      <Pagination>
        
      </Pagination>
      </div>

  );
}

export default Home;
