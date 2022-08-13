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
import UpdateArticle from "./UpdateArticle";

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

  handleLogout = () => {
    this.setState({ isLoggedIn: false, user: null });
    localStorage.removeItem(localStorageKey);
  };

  render() {
    if (this.state.isVerifying) {
      return <LoaderFile />;
    }
    return (
      <Router>
        <Header {...this.state} handleLogout={this.handleLogout} />
        {this.state.isLoggedIn ? (
          <AuthenticatedApp {...this.state} handleUser={this.updateUser} />
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
      <Route path="/articles/:slug" element={ <Article {...props}/>} />
      <Route path="/articles/edit/:slug" element = {<UpdateArticle {...props}/>}/>
      <Route path="/new-article" exact element = {<NewArticle />}/>
      <Route path="/settings" exact element={ <Setting  user={props.user} handleUser={props.updateUser} />}/>
      <Route path="/profiles/:id" exact  element={<Profile {...props}/>}/>
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
      <Route path="/articles/:slug" element={ <Article {...props}/>} />
      <Route path="/profiles/:id" element={<Profile user={props.user}/>} />
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