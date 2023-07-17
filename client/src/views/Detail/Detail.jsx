import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetail, getVideogamesDetail } from "../../redux/actions";
import { Link } from "react-router-dom";
//import {videogamesDetail} from '../../redux/reducer'
import styles from "../Detail/Detail.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
//import {videogamesDetail} from '../../redux/reducer';
function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(cleanDetail());
    dispatch(getVideogamesDetail(id));
  }, [dispatch, id]);
  const videogames = useSelector((state) => state?.detail);
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.img} key={videogames?.id}>
        <img 
        src={videogames.image}
         alt="img"
          />
      </div>
      
      <div className={styles.row}>
        <h3>Name: {videogames?.name}</h3>
        <div className={styles.gamedescription}>
          <h3>Description: {videogames?.description}</h3>
        </div>
        <div className={styles.header}>
          <h3>Released: {videogames?.released} </h3>
        </div>
        <div className={styles.header}>
          <h3>Rating:{videogames?.rating} </h3>
      
        </div>
        <div className={styles.header}>
          <h3>Platforms:{" "}
          {videogames.platforms}
          </h3>
        </div>
        <div className={styles.header}>
        <h3>
              Genres:{" "}
              {videogames.genres?.map((g) => (<p key={g.name}>{g.name}</p>
                ))}
            </h3>
        </div>
        </div>

        <Link to="/home">
          <button>Go Back</button>
        </Link>
      </div>
    </div>
  );
}
  
export default Detail;