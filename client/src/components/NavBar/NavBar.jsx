import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { useEffect } from "react";
import { getGenres } from "../../redux/actions";
import style from '../NavBar/NavBar.module.css';
function NavBar () { 
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(getGenres());
    }, [dispatch]);
    return (
        <div className={style.container}>
            <Link to="/home">HOME</Link>
            <Link to="/create">FORM</Link>
        </div>
    )
}

export default NavBar;