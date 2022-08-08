import React from 'react';
import { validations } from '../utilities/validations';
import { localStorageKey, UserVerifyURL } from '../utilities/constants';
import { Link } from "react-router-dom"

class Settings extends React.Component {
  constructor(props) {
    super();
    this.state = {
      image: props.user.image,
      username: props.user.username,
      email: props.user.email,
      password: '',
      bio: props.user.bio,
      errors: {
        username: '',
        email: '',
        password: '',
      },
    };
  }

  handleChange = ({ target }) => {
    let { name, value } = target;
    let { errors } = this.state;
    validations(errors, name, value);
    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    let { username, image, password, email, bio, errors } = this.state;
    event.preventDefault();
    if (username && image && password && email && bio) {
      fetch(UserVerifyURL, {
        method: 'PUT',
        body: JSON.stringify({
          user: { username, email, password, bio, image },
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage[localStorageKey],
        },
      })
        .then((res) => {
          // console.log(res);
          if (!res.ok) {
            return res.json().then((data) => {
              for (let key in data.errors) {
                errors[key] = `${key} ${data.errors[key]}`;
              }
              return Promise.reject({ errors });
            });
          }
          return res.json();
        })
        .then((data) => {
          this.props.history.push(`/profiles/${data.user.username}`);
        })
        .catch((err) => this.setState({ errors }));
    }
  };

  render() {
    // let { username, email, password } = this.state.errors;
    return (
      <>
         <form className="w-1/2 mx-auto p-8 border border-gray-400 rounded-md" onSubmit={this.handleSubmit}>
            <legend className="text-center text-3xl my-2 font-bold">Your Setting</legend>
            <fieldset className="flex flex-col">
              <input className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500" type="url" name="profilePictureUrl" placeholder="URL of profile picture" onChange={this.handleChange} />
              <input className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500" type="name" name="username" placeholder="Username" onChange={this.handleChange} />
              <textarea value={this.state.bio} rows="6" className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500" name="bio" placeholder="Short bio about you" onChange={this.handleChange}></textarea>
              <input className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500" type="email" name="email" placeholder="Your Email" onChange={this.handleChange}/>
              <input className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
              <input className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500" type="submit" value="Update Setting" />
            </fieldset>
         </form>
         <div className="border-t">
        <Link to="logout">
          <span className="px-5 py-10 text-red-800 border border-red cursor-pointer">or click here to logout</span>
        </Link>
        </div>
      </>
    )
  }}
  export default Settings;