import React, { useState } from "react";
import { RegistrationView } from "../registration-view/registration-view";
import { RegisterButton } from "../registration-view/register-button";
import {
  Form,
  Button,
  Container,
  Col,
  Card,
  CardGroup,
} from "react-bootstrap";
import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("login");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication / / then call props.onLoggedIn(username) */ props.onLoggedIn(
      username
    );
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
                        placeholder="Username"
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                      />
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