import React from "react";
import style from '../Card/Card.module.css'
import { useHistory } from 'react-router-dom';

function Card (props) {
const history = useHistory();
  function navigateHandler() {
    history.push(`/detail/${props.id}`);
  }
return (
    <div className={style.card}>
     <img src={props.image} alt={props.name} onClick={navigateHandler} />
      <h2>{props.name}</h2>
      {/* <p>{props.gender?.map((genre) => genre.name).join(', ')}</p> */}

    </div>
)
}
export default Card;
