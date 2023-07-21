import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from '../LandingPage/LandingPage.module.css';


function LandingPage () {
    return (
      <div>
<Link to="/home">
    <button className={style.button}>PLAY</button>
</Link>
    </div>
        )
}

export default LandingPage;