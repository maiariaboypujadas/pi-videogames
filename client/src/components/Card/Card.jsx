import React from "react";
import style from '../Card/Card.module.css'
function Card (props) {

return (
    <div className={style.card}>
     <img src={props.image} alt={props.name} />
      <h2>{props.name}</h2>
      <p>{props.gender}</p>

    </div>
)
}
export default Card;
