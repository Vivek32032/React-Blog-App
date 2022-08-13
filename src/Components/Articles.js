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

            <article className="article">
                {
                  articles.map(article => {
          return(   <div
              key={article.slug}
              className="bg-green-200 flex justify-between flex-col my-3 w-full p-4 rounded-md"
            >
              <div className="flex justify-between w-full">
                <div className="flex items-center my-2">
                  <Link to={`/profiles/${article.author.username}`}>
                    <img
                      src={article.author.image || 'smiley.png'}
                      alt={article.author.username}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  </Link>
                  <div className="ml-4">
                    <h5 className="text-indigo-900 font-bold text-xl mr-5">
                      {article.author.username}
                    </h5>
                    <h6>{this.getDate(article.createdAt)}</h6>
                  </div>
                </div>
                <div className="flex items-center text-xl border border-purple-900 px-2 py-3">
                  <i
                    className={
                      !this.props.isLoggedIn
                        ? 'fas fa-heart text-red-700'
                        : article.favorited
                        ? 'fas fa-heart cursor-pointer text-pink-600'
                        : 'far fa-heart cursor-pointer' 
                    }
                    onClick={(e) => this.props.handleFavorite(e)}
                    data-id={article.favorited}
                    data-slug={article.slug}
                  ></i>
                  <span className="ml-2">{article.favoritesCount}</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-5 mt-5">{article.title}</h2>
              <p className="text-gray-500 mb-5">{article.description}</p>
              <Link to={`/articles/${article.slug}`}>
                <h4 className="btn btn-indigo inline-block">Read More</h4>
              </Link>
            </div>
          );
        })}
        </article>
    );
  }
};
}

                            
//                             <Link to={`/articles/${article.slug}`}>
//                             <h3 className="text-2xl font-medium mb-5 mt-5">{article.title}</h3>
//                             <p className="text-gray-500 mb-5">{article.description}</p>
//                             <span className="text-sm text-gray-300">Read More...</span>
//                             </Link>                       
//                         </article>
//                     )
//                   })
//                 }
//             </div>
//         )}
//     }
// }

export default Articles;