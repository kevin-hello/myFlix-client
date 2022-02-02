import React from 'react';
import { Col, Row } from 'react-bootstrap';

// styling 
import './profile-view.scss';

export function UserInfo({username, email, birthday}){

  return(
    <Row className="justify-content-md-center">
    <Col>
    <div className="profileContent">
      <h1>My Profile</h1>
    </div>
    <h4>Username: {username}</h4>
    <h4>Password: ******</h4>
    <h4>Email: {email}</h4>
    <h4>Birthday: {birthday}</h4>
    </Col>
    </Row>
  )
}