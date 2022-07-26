import { Link, NavLink } from 'react-router-dom';

function Header(){
    return(
        <div className="container flex justify-between py-4">

            <Link to="/" exact>
                <span className="brand text-xl text-green-500 font-semibold">conduit</span>
            </Link>
            <nav>
            <NavLink to="/" exact>Home</NavLink>
            <NavLink className="ml-5" to="/login">Sign in</NavLink>
            <NavLink className="ml-5"  to="/register">Sign up</NavLink>

            </nav>
        </div>
    )
}

export default Header;