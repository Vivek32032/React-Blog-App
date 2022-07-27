import { Link, NavLink } from 'react-router-dom';

function Header(props){
    return(
        <div className="container flex justify-between py-4">

            <Link to="/" exact>
                <span className="brand text-xl text-green-500 font-semibold">conduit</span>
            </Link>
            <nav className="flex">
            {
             props.isLoggedIn ? <AuthHeader /> : <NonAuthHeader />
            }
    </nav>
        </div>
    )
}

function AuthHeader(props) {
    return (
  
        <nav className="flex">
        <NavLink
            to="/articles"
            activeClassName="btn-active"
            className="btn btn-green mr-5"
          >
            Home
          </NavLink>
          <NavLink
            to="/new-article"
            activeClassName="btn-active"
            className="btn btn-green mr-5"
          >
            New Article
          </NavLink>
          <NavLink
            to="/settings"
            activeClassName="btn-active"
            className="btn btn-green mr-5"
          >
            Settings
          </NavLink>
          <NavLink
            to="/profile"
            activeClassName="btn-active"
            className="btn btn-green"
          >
            Profile
          </NavLink>
        </nav>
    );
  }
  function NonAuthHeader(props) {
    return (
      
        <nav className="flex">
        <NavLink
            to="/articles"
            activeClassName="btn-active"
            className="btn btn-green mr-5"
          >
            Home
          </NavLink>
          <NavLink
            to="/register"
            activeClassName="btn-active"
            className="btn btn-green mr-5"
          >
            Sign-Up
          </NavLink>
          <NavLink
            to="/login"
            activeClassName="btn-active"
            className="btn btn-green"
          >
            Log-In
          </NavLink>
        </nav>
    );
  }
  

export default Header;