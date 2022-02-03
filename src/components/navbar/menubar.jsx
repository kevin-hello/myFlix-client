import React from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function Menubar ({user}) {

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/myFlix-client/", "_self");
  }



  const isAuth = () => {
    if(typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return(
    <Navbar className="main-nav" sticky="top" bg="dark" expand="lg" variant="dark">
      <Link to={`/`}>
      <Navbar.Brand className="navbar-logo">myFlix</Navbar.Brand>
      </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="nav-list ml-auto">
              {isAuth() && (
              <Link to={`/users/${user}`}>
              <Button className="nav-item" variant="link">{user}</Button> 
              </Link>
              )}
              {isAuth() && (
              <Link>
              <Button variant="link" onClick={() => { onLoggedOut() }}>Logout</Button>
              </Link>
              )}
              {!isAuth() && (
              <Link to={`/`}>
              <Button className="nav-item" variant="link">Login</Button> 
              </Link>
              )}
               {!isAuth() && (
              <Link to={`/register`}>
              <Button className="nav-item" variant="link">Register</Button> 
              </Link>
              )}
            </Nav>
          </Navbar.Collapse> 
    </Navbar>
  );
}


