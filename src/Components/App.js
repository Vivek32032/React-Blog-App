import React from "react"
import Header from "./Header"
import SignIn from "./SignIn"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignUp from "./SignUp"
import Article from "./Article";
import ArticlesHome from "./ArticlesHome";


function App(){
    return(
        <Router>
          <Header />
          <Routes>
            <Route path="/login" exact element={ <SignIn />} />
            <Route path="/register" element={ <SignUp />} />
            <Route path="/articles/:slug" element={ <Article />} />
            <Route path="/" exact element={ <ArticlesHome />}/>
          </Routes>
        </Router>
    )
}

export default App;