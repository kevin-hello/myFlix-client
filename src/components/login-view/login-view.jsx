import React, { useState } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';

import { BrowserRouter as Router } from 'react-router-dom';
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
    <Router>
                  <Form>
                    <h1>Login</h1>
                    <Form.Group controlId="formUsername">
                      <Form.Label>Username:</Form.Label>
                      <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter Username"
                      />
                      {/* code to display validation error message */}
                      {usernameErr && <p>{usernameErr}</p>}
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        />
                      {/* code to display validation error message */}
                      {passwordErr && <p>{passwordErr}</p>}
                    </Form.Group>
                    <Button
                      id= "submit"
                      variant="primary link"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                    <Button variant="secondary" type="button" onClick={() => {window.location.href="/register"}}>
                      Register
                    </Button>
                  </Form>
          </Router>
  );
}

LoginView.propTypes = {
  login: propTypes.shape({
    Username: propTypes.string.isRequired,
    Password: propTypes.string.isRequired,
  }),
  onLoggedIn: propTypes.func.isRequired,
}; 