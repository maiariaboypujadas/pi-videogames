import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetail, getVideogamesDetail } from "../../redux/actions";
import { Link } from "react-router-dom";
//import {videogamesDetail} from '../../redux/reducer'
//import styles from "../Detail/Detail.module.css";
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
      <div>
        <div key={videogames?.id}>
        <img 
        src={videogames.image}
         alt="img"
          />
      </div>
      
      <div>
        <h2>Name: {videogames?.name}</h2>
        <div>
          <h3>Description: {videogames?.description}</h3>
        </div>
        <div>
          <h3>Released:</h3>
          <p>{videogames?.released}</p>
        </div>
        <div>
          <h3>Rating:</h3>
          <p>{videogames?.rating}</p>
        </div>
        <div>
          <h3>Platforms:{videogames.platforms}
          </h3>
        </div>
        <div>
        <h2>
              Genres:{" "}
              {videogames.genres?.map((g) => (
                <p key={g.name}>{g.name}</p>
                ))}
            </h2>
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