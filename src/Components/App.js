import React from "react"
import Header from "./Header"
import SignIn from "./SignIn"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignUp from "./SignUp"
import Article from "./Article";
import ArticlesHome from "./ArticlesHome";
import Setting from "./Setting";
import LoaderFile from "./LoaderFile";
import Home from "./Home"
import Profile from "./Profile";
import NotFound from "./NotFound";
import { localStorageKey, UserVerifyURL } from '../utilities/constants';
import NewArticle from "./NewArticle";


class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null,
    isVerifying: true,
  };

  componentDidMount() {
    let storageKey = localStorage[localStorageKey];
    if (storageKey) {
      fetch(UserVerifyURL, {
        method: 'GET',
        headers: {
          authorization: `Token ${storageKey}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        })
        .then(({ user }) => this.updateUser(user))
        .catch((errors) => console.log(errors));
    } else {
      this.setState({ isVerifying: false });
    }
  }
  updateUser = (user) => {
    this.setState({ isLoggedIn: true, user, isVerifying: false });
    localStorage.setItem(localStorageKey, user.token);
  };

  render() {
    if (this.state.isVerifying) {
      return <LoaderFile />;
    }
    return (
      <Router>
        <Header isLoggedIn={this.state.isLoggedIn} user={this.state.user} />
        {this.state.isLoggedIn ? (
          <AuthenticatedApp {...this.state} />
        ) : (
          <UnAuthenticatedApp updateUser={this.updateUser} />
        )}
      </Router>
    );
  }
}
function AuthenticatedApp(props) {
  return (
    <Routes>
      <Route path="/" exact element={<Home />}/>
      <Route path="/articles" exact element={<ArticlesHome {...props} />}/>
      <Route path="/articles/:slug" element={ <Article />} />
      <Route path="/new-article" exact element = {<NewArticle updateUser={props.updateUser} />}/>
      <Route path="/settings" exact element={ <Setting />}/>
      <Route path="/profile" exact  element={<Profile />}/>
      <Route path="*" element={ <NotFound /> }/>
    </Routes>
  );
}

function UnAuthenticatedApp(props) {
  return (
    <Routes>
      <Route path="/" exact element={<Home />}/>
      <Route path="/register" exact element={ <SignUp updateUser={props.updateUser} />}/>
      <Route path="/login" exact element={<SignIn updateUser={props.updateUser} />}/>
      <Route path="/articles" exact element={<ArticlesHome {...props} />}/>
      <Route path="/articles/:slug" element={ <Article />} />
      <Route path="*" element={<NotFound />}/>
    </Routes>
  );
}

// function App(){
//     return(
//         <Router>
//           <Header />
//           <Routes>
//             <Route path="/login" exact element={ <SignIn />} />
//             <Route path="/register" element={ <SignUp />} />
//             <Route path="/articles/:slug" element={ <Article />} />
//             <Route path="/" exact element={ <ArticlesHome />}/>
//           </Routes>
//         </Router>
//     )
// }

export default App;