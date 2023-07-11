import Card from "../Card/Card";
import { useSelector } from "react-redux";
import style from '../Cards/Cards.module.css'

function Cards () {
    const videogames = useSelector(state => state.videogames)
return (
    <div className={style.styleCard}>
{videogames.map(game=>{
    return <Card
    name={game.name}
    image={game.image}
    gender={game.gender}
    />
})}
    </div>
)
}
export default Cards;

