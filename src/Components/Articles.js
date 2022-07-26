import React from "react";
import { Link } from 'react-router-dom';
import LoaderFile from "./LoaderFile";

class Articles extends React.Component {
 
    getDate(date) {
            let newDate = new Date(date).toDateString();
            return newDate;
          }

    render(){
    let { articles, error } = this.props;
    if (error) {
    return <h2 className="text-red-500 text-center text-xl mt-8">{error}</h2>;
    }

    else if (!articles) {
    return <LoaderFile />;
    }

    else if (!articles.length) {
    return (
      <h2 className="text-red-500 text-center text-xl mt-8">
        No articles found
      </h2>
    );
    }  

        else {
        return (

            <div className="article">
                {
                  articles.map(article => {
                    return (
                        <article className="mr-5 mb-5 border-t pt-5" key={article.slug}>
                            <div className="flex justify-between">
                               <div className="flex ">
                                <img className="w-8 h-8 rounded-full mr-2" src={article.author.image} alt={article.author.username}/>
                                <div>
                                <h4 className="text-green-400 text-sm">{article.author.username}</h4>
                                <h6 className="text-xs text-gray-400">{this.getDate(article.createdAt)}</h6>
                                </div>
                                </div>

                                <div className="flex items-center border border-purple-900 px-1 py-0.5 self-center rounded">
                                   <i className="far fa-heart text-red-700"></i>
                                   <span className="ml-2 text-sm">{article.favoritesCount}</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-medium mb-5 mt-5">{article.title}</h3>
                            <p className="text-gray-500 mb-5">{article.description}</p>
                            <Link to={`/articles/${article.slug}`}>
                              <button className="text-sm text-gray-300">Read More...</button>
                            </Link>                       
                        </article>
                    )
                  })
                }
            </div>
        )}
    }
}

export default Articles;