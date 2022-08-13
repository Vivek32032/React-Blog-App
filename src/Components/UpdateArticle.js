import React from 'react';
import { ArticlesURL, localStorageKey } from '../utilities/constants';
import LoaderFile from './LoaderFile';
import { useParams } from "react-router-dom";
import { createBrowserHistory } from "history";


function withParams(Component) {
    return (props) => <Component {...props} params={useParams()} />;
  }

class UpdateArticle extends React.Component {
  constructor(props) {
    super();
    this.state = {
      article: '',
      title: '',
      description: '',
      body: '',
      tags: '',
      error: '',
    };
  }

  componentDidMount() {
    this.getArticle();
  }

  getArticle = () => {
    fetch(ArticlesURL + `/${this.props.params.slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(({ article }) => {
        let { title, description, tagList, body } = article;
        this.setState({
          article,
          title,
          body,
          description,
          tags: tagList.join(','),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = ({ target }) => {
    let { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    let { title, description, body, tags } = this.state;
    let token = 'Bearer ' + localStorage[localStorageKey];
    event.preventDefault();
    if (title && description && body && tags) {
      fetch(ArticlesURL + '/' + this.props.params.slug, {
        method: 'PUT',
        body: JSON.stringify({
          article: {
            title,
            description,
            body,
            tagList: tags.split(',').map((tag) => tag.trim()),
          },
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
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
            const history = createBrowserHistory();
        history.push(`/articles/${this.props.params.slug}`);
        history.go();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({ error: 'Enter all fields' });
    }
  };

  render() {
    let { title, description, body, tags, error, article } = this.state;
    if (!article) {
      return <LoaderFile />;
    }
    return (
      <main>
        <section className="pt-20">
          <form
            className="w-1/2 mx-auto p-8 border border-gray-400 rounded-md"
            onSubmit={this.handleSubmit}
          >
            <legend className="text-3xl text-center font-bold my-3 text-indigo-900">
              Edit Article
            </legend>
            <fieldset className="flex flex-col">
              <span className="text-red-500 my-1">{error}</span>
              <input
                type="text"
                value={title}
                placeholder="Title"
                name="title"
                onChange={this.handleChange}
                className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500"
              />
              <input
                type="text"
                value={description}
                name="description"
                placeholder="Description"
                onChange={this.handleChange}
                className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500"
              />
              <textarea
                rows="6"
                value={body}
                name="body"
                placeholder="Articles's Body"
                onChange={this.handleChange}
                className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500"
              ></textarea>
              <input
                type="text"
                value={tags}
                name="tags"
                placeholder="Tag List(comma seperated)"
                onChange={this.handleChange}
                className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500"
              />
              <input
                type="submit"
                value="Update Article"
                className="btn w-2/6 self-end bg-blue-500 hover:bg-blue-400 text-white "
              />
            </fieldset>
          </form>
        </section>
      </main>
    );
  }
}

export default withParams(UpdateArticle);