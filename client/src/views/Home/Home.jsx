

import { useDispatch } from "react-redux";
import { getVideogames } from "../../redux/actions";
import { useEffect } from "react";
import Cards from "../../components/Cards/Cards";

function Home () {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVideogames());
    },[dispatch])
    return (
        <>
        <h1>Esta es la vista desde Home</h1>
        <Cards/>
        </>
    )
}

export default Home;