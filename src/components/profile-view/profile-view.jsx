import React from 'react';
import axios from 'axios';
// UI elements 
import {Button, Card, Col, Form, Row, Container} from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';

// styling 
import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state={
      username: null,
      password: null,
      email: null,
      birthday: null,
      favorites: [],
    };
  }

  componentDidMount() {
    this.props.getUser()
  }

  onRemoveFavorite = (e, movie) => {
    const username = localStorage.getItem('user');
    console.log(username)
    const token = localStorage.getItem('token');
    console.log(this.props)
    axios.delete(`https://my-flix-movies-app.herokuapp.com/users/${username}/movies/${movie._id}`, 
    { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      console.log(response);
      alert("movie has been removed from favorites");
      this.componentDidMount();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  deleteUser() {
    const confirmation = window.confirm("Are you sure you want to delete your account?");
    if (confirmation) {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      axios.delete('https://my-flix-movies-app.herokuapp.com/users/${username}',
      { headers: {Authorization: `Bearer ${token}`} }
      )
      .then(() => {
        alert(user + "has been deleted.");
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/','_self'); 
      })
      .catch(function(error) {
        console.log(error);
      })};
  }

  editUser(e) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.put(`https://my-flix-movies-app.herokuapp.com/users/${username}`,
    {
      Username: this.state.Username,
      Password: this.state.Password,
      Email: this.state.Email,
      Birthday: this.state.Birthday
    },
    { headers: {Authorization: `Bearer ${token}`} 
  })
    .then((response) => {
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday
      });
      localStorage.setItem('user', response.data.Username);
      const data = response.data;
      console.log(data);
      console.log(this.state.Username);
      alert('Profile updated');
      window.location.reload();
    })
    .catch( function(error){
      console.log(error);
    })
  }

  setUsername(value) {
    this.state.Username = value;
  }

  setPassword(value) {
    this.state.Password = value;
  }

  setEmail(value) {
    this.state.Email = value;
  }

  setBirthday(value) {
    this.state.Birthday = value;
  }

  render() {
    const { name, username, email, birthday, favorites  } = this.props
console.log(this.props)

    return (
      
      <Container className="profile-view">
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
        
      </Container>
    );
  }
}