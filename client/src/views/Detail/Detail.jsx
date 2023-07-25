import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetail, getVideogamesDetail } from "../../redux/actions";
//import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from '../Detail/Detail.module.css';

const Detail = () =>  {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getVideogamesDetail(id));
    return () => {
      dispatch(cleanDetail());
    }
  }, [dispatch, id]);
  
  const videogames = useSelector((state) => state?.detail);

  return (
    <div className={styles.container}>
      {/* <div className={styles.img}>
        <img src={videogames?.image} alt="img" width='200px' height='200px'/>
          </div> */}
          <div className={styles.details}>
          {/* <h3>Name: {videogames?.name}</h3> */}
        <div>
          <p>Description: {}</p>
          {/* <p>{ videogames?.description}</p> */}
        </div>
        {/* <div>
          <h3>Released: {videogames?.released} </h3>
        </div>
        <div>
          <h3>Rating:{videogames?.rating} </h3>
        </div>
          <div>
          <h3>Platforms:{" "}{videogames?.platforms} </h3>
        </div>
        <div>
        <h3>Genres:{" "}</h3>
  <ul>
    {videogames.genres?.map((genre, index) => (
      <li key={index}>{genre}</li>
    ))}
  </ul>
    </div>
        <Link to="/home">
          <button>Go Back</button>
        </Link>
      </div> */}
      </div>
    </div>

  );
}
  
export default Detail;