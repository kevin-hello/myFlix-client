import React from 'react';
import {Navbar, Nav, Button, Form} from 'react-bootstrap';
import { Link, Route} from 'react-router-dom';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import './menubar.scss';

export function Menubar ({user, visibilityFilter}) {

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
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
    <Navbar className="main-nav" sticky="top" bg="primary" expand="lg" variant="dark">
      <Link to={`/`}>
      <Navbar.Brand className="navbar-logo">myFlix</Navbar.Brand>
      </Link>
          {isAuth() && (
          <Route exact path="/" render={() => <Form className="search-input"><VisibilityFilterInput visibilityFilter={visibilityFilter} /></Form>}/>
          )}

          <Navbar.Toggle aria-controls="responsive-navbar-nav" className='nav-toggle-icon' />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="nav-list ml-auto">

              {isAuth() && (
              <Link to={`/`}>
              <Button style={{color:"white"}} className="nav-item" variant="link">Movies</Button> 
              </Link>
              )}
              {isAuth() && (
              <Link to={`/users/${user}`}>
              <Button style={{color:"white"}} className="nav-item" variant="link">{user}</Button> 
              </Link>
              )}
              {isAuth() && (
              <Link>
              <Button style={{color:"white"}} className="nav-item" variant="link" onClick={() => { onLoggedOut() }}>Logout</Button>
              </Link>
              )}
              {!isAuth() && (
              <Link to={`/`}>
              <Button style={{color:"white"}} className="nav-item" variant="link">Login</Button> 
              </Link>
              )}
               {!isAuth() && (
              <Link to={`/register`}>
              <Button style={{color:"white"}} className="nav-item" variant="link">Register</Button> 
              </Link>
              )}
            </Nav>
          </Navbar.Collapse> 
    </Navbar>
  );
}


