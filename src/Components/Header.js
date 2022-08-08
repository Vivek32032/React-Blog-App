import { NavLink} from 'react-router-dom';

function Header(props) {

  return (
    <header className="flex justify-between bg-green-50 px-20 py-8">
      <NavLink to="/">
        <h1 className="text-4xl font-extrabold text-gray-700 font-logo">
          Alt Blog
        </h1>
      </NavLink>
      <nav className="flex">
        {props.isLoggedIn ? (
          <AuthHeader {...props} handleLogout={props.handleLogout} />
        ) : (
          <NonAuthHeader />
        )}
      </nav>
    </header>
  );
}

function AuthHeader(props) {
  return (
    <nav className="flex items-center">
      <NavLink
        to={{
          user: props.user,
          pathname: `/profiles/${props.user.username}`,
        }}
        className="btn mr-5 bg-yellow-100 transform transition duration-500 hover:scale-105"
      >
        <div className="flex items-center text-xl mx-3">
          <img
            src={props.user.image}
            // alt={props.user.username}
            alt= ""
            className="w-5 h-5 rounded-full"
          />
          <span className="ml-2 text-gray-600 font-thin">{props.user.username}</span>
        </div>
      </NavLink>
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
      <button className="btn btn-green" onClick={props.handleLogout}>
        Logout
      </button>
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