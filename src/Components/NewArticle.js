import React from 'react';
import { ArticlesURL, localStorageKey } from '../utilities/constants';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { createBrowserHistory } from "history";

class NewArticle extends React.Component {
  state = {
    title: '',
    description: '',
    tags: '',
    body: '',
    error: '',
  };
  handleChange = ({ target }) => {
    let { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    let { title, description, tags, body } = this.state;
    tags = tags.split(',').map((tag) => tag.trim());
    let token = localStorage[localStorageKey];
    event.preventDefault();
    if (title && description && tags && body) {
      fetch(ArticlesURL, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          article: { title, description, body, tagList: tags },
        }),
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
          console.log(data);
          const history = createBrowserHistory();
          history.push(`/articles/${data.article.slug}`);
          console.log(history)
          history.go()
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            title: '',
            description: '',
            body: '',
            tags: '',
            error: '',
          });
        });
    } else {
      this.setState({
        title: '',
        description: '',
        body: '',
        tags: '',
        error: 'Enter all fields',
      });
    }
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      body: text,
    });
  };
  clearEditor = ({html, text}) => {
    text = "";

   return (html = "")


  }

  render() {
    const mdParser = new MarkdownIt();
    return (
      <main>
        <section>
          <form className="w-2/4 mx-auto mt-10" onSubmit={this.handleSubmit}>
            <input
              className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"
              type="text"
              placeholder="Enter Title"
              value={this.state.title}
              name="title"
              onChange={(e) => this.handleChange(e)}
            ></input>
            <input
              className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"
              type="text"
              placeholder="Enter Description"
              value={this.state.description}
              name="description"
              onChange={(e) => this.handleChange(e)}
            ></input>
            <input
              className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"
              type="text"
              placeholder="Enter Tags"
              value={this.state.tags}
              name="tags"
              onChange={(e) => this.handleChange(e)}
            ></input>
            {/* <textarea
              name="body"
              className="block w-full h-40 my-3 py-2 px-3 border border-gray-400 rounded-md"
              placeholder="Article..."
              value={this.state.body}
              data-provide="markdown"
              onChange={(e) => this.handleChange(e)}
            /> */}
            <MdEditor
              style={{ height: '500px' }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              onSubmit={this.clearEditor}
            />
            <input
              type="submit"
              value="Publish Article"
              className="block w-full btn bg-green-500 text-white font-bold cursor-pointer"
            />
          </form>
        </section>
      </main>
    );
  }
}
export default NewArticle;