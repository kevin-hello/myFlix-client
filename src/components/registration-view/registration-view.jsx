import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './registration-view.scss'
import propTypes from 'prop-types';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
//hook for input validation
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');
  const [ emailErr, setEmailErr ] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if(!username){
    setUsernameErr('Username Required');
    isReq = false;
    }else if(username.length < 4){
    setUsernameErr('Username must be at least 4 characters long');
    isReq = false;
    }
    if(!password){
    setPasswordErr('Password Required');
    isReq = false;
    }else if(password.length < 6){
    setPasswordErr('Password must be 6 characters long');
    isReq = false;
    }
    if(!email){
      setEmailErr('Email Required');
      isReq = false;
    }else if(email.indexOf('@') === -1){
      setEmailErr('Please enter a valid email');
      isReq = false;
    }
    return isReq;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq  = validate();
    if(isReq) {
      axios.post('https://my-flix-movies-app.herokuapp.com/users',
      {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        alert('Registration successful, please login');
        window.open("/myFlix-client/",'_self');  
        //_self is needed to open page in the current tab
      })
      .catch(response => {
        console.error(response);
        alert('unable to register');
      });
    }
  };

  return (
            <Form>
            <h1>Create Account</h1>

            <div class="form-group">
              <input type="text" value={username} id="username" name="Username" class="form-control" onChange={e => setUsername(e.target.value)} required/>
              <label class="form-control-placeholder" for="username">Username</label>
              {usernameErr && <p>{usernameErr}</p>}
            </div>
            <div class="form-group">
              <input type="password" value={password} id="password" name="Password" class="form-control" onChange={e => setPassword(e.target.value)} required/>
              <label class="form-control-placeholder" for="password">Password</label>
              {passwordErr && <p>{passwordErr}</p>}
            </div>
            <div class="form-group">
              <input type="email" value={email} id="email" name="Email" class="form-control" onChange={e => setEmail(e.target.value)} required/>
              <label class="form-control-placeholder" for="email">Email</label>
              {emailErr && <p>{emailErr}</p>}
            </div>
            <div class="form-group">
              <input type="date" value={birthday} id="birthday" name="Birthday" class="form-control" onChange={e => setBirthday(e.target.value)} required/>
              <label class="form-control-placeholder" for="birthday">Birthday</label>
            </div>
            <Button id="submit" type="submit" onClick={handleSubmit}>Submit</Button>
            </Form>
  );
}

RegistrationView.propTypes = {
  register: propTypes.shape({
    Username: propTypes.string.isRequired,
    Password: propTypes.string.isRequired,
    Email: propTypes.string.isRequired,
    Birthday: propTypes.instanceOf(Date).isRequired,
  }),
};


            {/* <Form>
            <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control 
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder='Enter a username'
            required
            />
            {usernameErr && <p>{usernameErr}</p>}
            </Form.Group>
            <Form.Group required controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)} 
            placeholder='Password must be at least 6 characters'
            required
            />
            {passwordErr && <p>{passwordErr}</p>}
            </Form.Group>
            <Form.Group required controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control 
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)} 
            placeholder='Enter your email'
            required
            />
            {emailErr && <p>{emailErr}</p>}
            </Form.Group>
            <Form.Group required controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control 
            type="date" 
            value={birthday}
            onChange={e => setBirthday(e.target.value)}
            required
            />
            </Form.Group>
            <Button id="submit" type="submit" onClick={handleSubmit}>Submit</Button>
            </Form> */}
