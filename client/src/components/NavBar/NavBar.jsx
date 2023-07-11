import { Link } from "react-router-dom";

function NavBar () { 
    return (
        <div>
            <Link to="/home">HOME</Link>
            <Link to="/create">FORM</Link>

        </div>
    )
}

export default NavBar;