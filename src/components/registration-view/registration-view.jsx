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
            <div className="form-group">
              <input type="email" value={email} id="email" name="Email" className="form-control" onChange={e => setEmail(e.target.value)} required/>
              <label className="form-control-placeholder" htmlFor="email">Email</label>
              {emailErr && <p>{emailErr}</p>}
            </div>
            <div className="form-group">
              <input type="date" value={birthday} id="birthday" name="Birthday" className="form-control" onChange={e => setBirthday(e.target.value)} required/>
              <label className="form-control-placeholder" htmlFor="birthday">Birthday</label>
            </div>
            <Button id="submit" type="submit" onClick={handleSubmit}>Submit</Button>
            </Form>
  );
}

