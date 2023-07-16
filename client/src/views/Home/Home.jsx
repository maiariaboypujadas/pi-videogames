import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames } from '../../redux/actions';
import Cards from '../../components/Cards/Cards';
import SearchBar from '../../components/SearchBar/SearchBar';
import Paginado from '../../components/Paginado/Paginado';

function Home() {
    // searchBar ----
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);

  useEffect(() => {
  dispatch(getVideogames());
}, [dispatch]);
// searchBar------
const [currentPage, setCurrentPage] = useState(1);
const [elementsPerPage] = useState(15);
const totalElements = videogames.length;
const totalPage = Math.ceil(totalElements / elementsPerPage); // devuelve cant de paginas
//calcular indices de la pagina actual
  const indexOfLastElement = currentPage * elementsPerPage;
  const indexOfFirstElement = indexOfLastElement - elementsPerPage;
 
  //obtener elementos de la pagina actual
  const currentElements = videogames.slice(
    indexOfFirstElement,
    indexOfLastElement
  );
  function handlePageClick(event) {
    setCurrentPage(Number(event.target.id));
  }
  
  //----------
  // const pageData = [];
  // for (let i = 0; i < totalPage; i++) {
  //   const start = i * elementsPerPage;
  //   const end = start + elementsPerPage;
  //   const pageElements = videogames.slice(start, end);
  //   pageData.push({ label: `${i + 1}`, data: pageElements });
  // }


  return (
    <>
      <h1>List of Videogames</h1>
          <SearchBar />
      <ul>
      <Paginado
       currentPage={currentPage}
       setCurrentPage={setCurrentPage}
       totalPages={totalPage}
       elementsPerPage={elementsPerPage}
       handlePageClick={handlePageClick}
      />
            {<Cards videogames={videogames} />}  
        {/* searchbar lo de arriba */}

        {currentElements?.map((el, index) => (
          <Cards
            key={`${el.id}-${index}`}
            id={el.id}
            name={el.name}
            image={el.image}
            genres={el.genres}
          />
        ))}
      </ul>
      <Paginado
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPage}
        elementsPerPage={elementsPerPage}
        handlePageClick={handlePageClick}
    
      />
      <hr></hr>
    </>
  );
}

export default Home;

