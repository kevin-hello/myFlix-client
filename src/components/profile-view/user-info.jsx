import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Moment from 'react-moment';
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
    <h4>Birthday: 
      <Moment format="MM/DD/YYYY">
        {birthday}
      </Moment>
      </h4>
    </Col>
    </Row>
  )
}