import React, { useState } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';

import { BrowserRouter as Router } from 'react-router-dom';
import { Link } from 'react-router-dom';
// UI Elements
import { Form, Button } from 'react-bootstrap';
//styling
import './login-view.scss';




export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
//hook for each input
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

// validate user inputs

  const validate =() => {
    let isReq = true; 
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    }else if (username.length < 4) {
      setUsernameErr("Username must be at least 4 characters long");
      isReq = false;
    }
    if(!password){
      setPasswordErr("Password Required");
      isReq = false;
    } else if(password.length < 6){
      setPasswordErr("Password must be at least 6 characters long");
    isReq = false; 
  }
  return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // send a request to the server for authentication 
    axios.post('https://my-flix-movies-app.herokuapp.com/login',
    {
      Username: username,
      Password: password

    })
    .then(response=>{
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log("no such user")
    });
  };
  return (
        <Form id="login-form">
            <h1>Login</h1>
            <div className="form-group">
              <input type="text" value={username} id="username" name="Username" className="form-control" onChange={e => setUsername(e.target.value)} required/>
              <label className="form-control-placeholder" htmlFor="username">Username</label>
              {usernameErr && <p>{usernameErr}</p>}
            </div>
            <div className="form-group">
              <input type="password" value={password} id="password" name="Password" className="form-control" onChange={e => setPassword(e.target.value)} required/>
              <label className="form-control-placeholder" htmlFor="password">Password</label>
              {passwordErr && <p>{passwordErr}</p>}
            </div>
            <Button
            id= "submit"
            variant="primary link"
            type="submit"
            onClick={handleSubmit}>Login</Button>
            <Link to={`/register`} >
              <Button id="register" variant="secondary">Register</Button> 
            </Link>
        </Form>
  );
}

LoginView.propTypes = {
  login: propTypes.shape({
    Username: propTypes.string.isRequired,
    Password: propTypes.string.isRequired,
  }),
  onLoggedIn: propTypes.func.isRequired,
}; 
