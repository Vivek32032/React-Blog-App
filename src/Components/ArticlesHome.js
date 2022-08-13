import React from 'react';
import Articles from './Articles';
import Tags from './Tags';
import { ArticlesURL, feedURL, localStorageKey } from '../utilities/constants';
import Pagination from './Pagination';
import Hero from "./Hero"

class ArticlesHome extends React.Component {
  constructor(props) {
    super();
    
    this.state = {
      articles: null,
      error: '',
      articlesCount: 0,
      articlesPerPage: 10,
      activePageIndex: 1,
      tagSelected: '',
      feedSelected: '',
    };
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.setState({ feedSelected: 'myfeed' }, this.myFeed);
    } else {
      this.setState({ feedSelected: 'global' }, this.getArticles);
    }
  }


  componentDidUpdate(_prevProps, prevState) {
    if (
      prevState.activePageIndex !== this.state.activePageIndex ||
      prevState.tagSelected !== this.state.tagSelected
    ) {
      this.getArticles();
    }
  }

  updateCurrentPageIndex = (index) => {
    this.setState({ activePageIndex: index }, this.getArticles);
  };

  getArticles = () => {
    let limit = this.state.articlesPerPage;
    let offset = (this.state.activePageIndex - 1) * 10;
    let tag = this.state.tagSelected;
    let token = localStorage[localStorageKey];
    fetch(
      ArticlesURL + `/?offset=${offset}&limit=${limit}` + (tag && `&tag=${tag}`), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          articles: data.articles,
          articlesCount: data.articlesCount,
        });
      })
      .catch((err) => {
        this.setState({ error: 'Not able to fetch Articles' });
      });
  };

  selectTag = ({ target }) => {
    let { value } = target.dataset;
    this.setState({ tagSelected: value }, this.getArticles());
  };

  myFeed = () => {
    let offset = (this.state.activePageIndex - 1) * 10;
    let token = localStorage[localStorageKey];
    fetch(feedURL + `?/limit=${this.state.articlesPerPage}&skip=${offset}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          articles: data.articles,
          articlesCount: data.articlesCount,
          feedSelected: 'myfeed',
          tagSelected: '',
        });
      })

      .catch((err) => this.setState({ error: 'Not able to fetch Articles' }));
  };

  handleFavorite = ({ target }) => {
    let { id, slug } = target.dataset;
    let method = id === 'false' ? 'POST' : 'DELETE';

    if (this.props.isLoggedIn) {
      fetch(ArticlesURL + '/' + slug + '/favorite', {
        method: method,
        headers: {
          Authorization: 'Token ' + localStorage[localStorageKey],
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then(({ errors }) => {
              return Promise.reject(errors);
            });
          }
          return res.json();
        })
        .then((data) => {
          if (this.state.feedSelected === 'myfeed') {
            this.myFeed();
          } else {
            this.getArticles();
          }
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    let { articles, error, articlesCount, articlesPerPage, activePageIndex,feedSelected } = this.state;

    return (
      // Hero section
      <>
      <Hero />
      <div className="px-24 py-16 w-full ">
        {/* feeds part */}
        <div className="flex mb-3">
          <span
             className={
              feedSelected === 'global'
                ? 'cursor-pointer mr-8 text-xl text-green-500'
                : 'cursor-pointer mr-8 text-xl'
            }
            onClick={() =>
              this.setState(
                {
                  tagSelected: '',
                  feedSelected: "global"
                },
                this.getArticles
              )
            }
          >
            <i className="fas fa-newspaper mr-2"></i>
            Global Feed{' '}
          </span>
          <span
            className={
              !this.props.isLoggedIn
                ? 'hidden'
                : feedSelected === 'myfeed'
                ? 'text-xl mr-8 cursor-pointer text-green-500'
                : 'text-xl  cursor-pointer green'
            }
            onClick={this.myFeed}
          >
            {' '}
            <i className="fas fa-newspaper mr-2"></i>
            My feed
          </span>
          <div
            className={this.state.tagSelected ? 'visible text-xl' : 'hidden'}
          >
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-green-700">#{this.state.tagSelected}</span>
          </div>
        </div>

        {/* articles part */}
        <section className="flex justify-between ">
          <div className="w-4/6">
            <Articles
              articles={articles}
              error={error}
              isLoggedIn={this.props.isLoggedIn}
              handleFavorite={this.handleFavorite}
            />
          </div>

          {/* tags part */}
          <div className="w-80">
            <Tags selectTag={this.selectTag} />
          </div>
          {/* Pagination */}
        </section>
        <div className="mt-10">
          <Pagination
            articlesCount={articlesCount}
            articlesPerPage={articlesPerPage}
            activePageIndex={activePageIndex}
            updateCurrentPageIndex={this.updateCurrentPageIndex}
          />
        </div>
      </div>
      </>
    );
  }
}

export default ArticlesHome;