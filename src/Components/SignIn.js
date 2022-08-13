import React from "react";
import { Link } from 'react-router-dom';
import { loginURL } from '../utilities/constants';
import { validations } from '../utilities/validations';
import { useNavigate } from 'react-router-dom';


class SignIn extends React.Component{

    state = {
        email : "",
        password : "",
        errors : {
            email : "",
            password : "",
        }
    }
    handleChange = ({ target }) => {
        let { name, value } = target;
        let { errors } = this.state;
        validations(errors, name, value);
        this.setState({ [name]: value, errors });
      };


      handleSubmit = (event) => {
        let { email, password } = this.state;
        event.preventDefault();
        if (password && email) {
          fetch(loginURL, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ user: { password: password, email } }),
          })
            .then((res) => {
              if (!res.ok) {
                return res.json().then(({ errors }) => {
                  return Promise.reject(errors);
                });
              }
              return res.json();
            })
            .then(({ user }) => {
              this.props.updateUser(user);
              this.setState({ password: '', email: '' });
              const navigate = useNavigate();
              navigate('/articles');
            })
            .catch((error) => { 
              this.setState((prevState) => {
              return {
                ...prevState,
                errors: {
                  ...prevState.errors,
                  email: "Email or Password is incorrect!",
                },
              };
            });
          });
      }
    }
    

    render(){
        let { email, password } = this.state.errors;


    return (
      <>
        <div className="text-center">
    
        <form className=" w-1/3 p-10 pt-5 mx-auto bg-gray-100 mt-10" onSubmit={this.handleSubmit}>
        <div className="my-5">
        <legend className="text-4xl text-medium mb-2">Sign In</legend>
        <Link to="/register">
        <span className="text-green-400 inline-block py-2">Need an account</span>
        </Link>
        </div>
        <fieldset className="flex flex-col">
            <input onChange={this.handleChange} className="px-4 py-2 mb-4 border w-full" type="email" id="email" placeholder="Email" name="email" value={this.state.email} />
            <span className="text-red-500">{email}</span>

            <input onChange={this.handleChange} className="px-4 py-2 my-4 border w-full" type="password" id="password"  placeholder="password" name="password" value={this.state.password}/>
            <span className="text-red-500">{password}</span>

            <input className="text-xl m-auto rounded-md cursor-pointer bg-green-500 text-gray-100 mt-5 py-2 w-1/3" type="submit" value="Sign in" disabled={password || email}/>
        </fieldset>
        </form>
        </div>
       
        </>

    )
    }
}

export default SignIn;