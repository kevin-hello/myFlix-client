import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';
import './registration-view.scss'

export function RegistrationView(props) {
  const [ usernameReg, setUsernameReg ] = useState('');
  const [ passwordReg, setPasswordReg ] = useState('');
  const [ emailReg, setEmailReg ] = useState('');
  const [ birthdayReg, setBirthdayReg ] = useState('');

  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log(usernameReg, passwordReg, emailReg, birthdayReg);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    // props.onRegister(username);
  };

  return (
       
            <Form>
            <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control 
            type="text"
            value={usernameReg}
            onChange={e => setUsernameReg(e.target.value)}
            placeholder='Enter a username'
            required
            />
            </Form.Group>
            <Form.Group required controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
            type="password"
            value={passwordReg}
            onChange={e => setPasswordReg(e.target.value)} 
            placeholder='Password must be at least 8 characters'
            required
            />
            </Form.Group>
            <Form.Group required controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control 
            type="email"
            value={emailReg}
            onChange={e => setEmailReg(e.target.value)} 
            placeholder='Enter your email'
            required
            />
            </Form.Group>
            <Form.Group required controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control 
            type="date" 
            value={birthdayReg}
            onChange={e => setBirthdayReg(e.target.value)}
            required
            />
            </Form.Group>
            <Button id="submit" type="submit" onClick={handleSubmit}>Submit</Button>
          </Form>
        
            
  );
}
