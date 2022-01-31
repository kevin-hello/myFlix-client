import React, { useState } from "react";
import { RegistrationView } from "../registration-view/registration-view";
import {
  Form,
  Button,
  Container,
  Col,
  Card,
  CardGroup
} from "react-bootstrap";
// import { Navbar } from "../navbar/navbar";
import './login-view.scss';
import axios from "axios";
import propTypes from 'prop-types';



export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
//hook for each input
  const [ usernameErr, setUsernameErr ] = useState("");
  const [ passwordErr, setPasswordErr ] = useState("");

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


  const [state, setState] = useState("login");
  const handleSubmit = (e) => {
    e.preventDefault();
    // send a request to the server for authentication 
    axios.post("https://my-flix-movies-app.herokuapp.com/login",
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
    <Container>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>
                  {state === "login" ? "Login" : "Create Account"}
                </Card.Title>

                {state === "login" && (
                  <Form>
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
                      variant="primary"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Form>
                )}

                {state === "login" && (
                  <RegisterButton addTrip={() => setState("create Account")} />
                )}

                {state === "create Account" && <RegistrationView />}
              </Card.Body>
            </Card>
          </CardGroup>
    </Container>
  );
}

LoginView.propTypes = {
  login: propTypes.shape({
    Username: propTypes.string.isRequired,
    Password: propTypes.string.isRequired,
  }),
};