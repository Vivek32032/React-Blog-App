import React from 'react';
import { Link } from 'react-router-dom';
import { validations } from "../utilities/validations"
import { registerURL } from '../utilities/constants';


class SignUp extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: {
        username: '',
        password: '',
        email: '',
      },
    };
  }

  handleChange = ({ target }) => {
    let { name, value } = target;
    let errors = this.state.errors;
     validations(errors, name, value);
    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    let { email, password, username, errors } = this.state;
    event.preventDefault();
    if (username && password && email) {
      fetch(registerURL, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ user: { username, password, email } }),
      }).then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            for (let key in data.errors) {
              errors[key] = `${key} ${data.errors[key]}`;
            }
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({user}) => {
        console.log(user);
        this.props.updateUser(user);
        this.setState({password: "", email: "", username: "", errors})
        this.props.history.push("/login");
    })
    .catch((errors) => this.setState({errors}));
    }
  };
  
  render() {
    let { username, password, email } = this.state.errors;
    return (
        <div className="text-center">
            <form className="flex flex-col w-1/3 p-10 pt-5 pt-2 mx-auto bg-gray-100 mt-10" onSubmit={this.handleSubmit}>
            <legend className="text-4xl mt-5 text-medium mb-2">Sign Up</legend>
            <Link to="/login">
            <span className="text-green-400 inline-block py-2">Already Have an account</span>
            </Link>
           <fieldset className='flex flex-col'>
            <input onChange={this.handleChange} className="px-4 py-2 my-4 border w-full" type="text" id="username" name="username" placeholder="Username" value={this.state.username}/>
            <span className="text-red-500">{username}</span>

            <input onChange={this.handleChange} className="px-4 py-2 my-4 border w-full" type="email" id="email" placeholder="Email" name="email" value={this.state.email} />
            <span className="text-red-500">{email}</span>

            <input onChange={this.handleChange} className="px-4 py-2 my-4 border w-full" type="password" id="password"  placeholder="password" name="password" value={this.state.password}/>
            <span className="text-red-500">{password}</span>
            <input className="text-xl m-auto rounded-md text-red-500 cursor-pointer bg-red-500 text-gray-100 mt-5 py-2 w-1/3" type="submit" value="Sign up" disabled={username || email || password} />
            </fieldset>

        </form>
        </div>
    )}
}
export default SignUp;