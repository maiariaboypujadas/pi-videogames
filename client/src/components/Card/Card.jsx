import React from "react";
import style from '../Card/Card.module.css'
import { useHistory } from 'react-router-dom';

function Card ({image, name, genres, description_raw, id}) {
const history = useHistory();
  function navigateHandler() {
    history.push(`/detail/${id}`);
  }
return (
    <div className={style.card}>
     <img src={image} alt={name} onClick={navigateHandler} />
      <h2>{name}</h2>
      <h3>{typeof genres[0] === "object" ? genres.map((elem) => elem.name + " ") : genres.map((elem) => elem + " ")}</h3>
     <h3>{description_raw}</h3>

    </div>
)
}
export default Card;
