import React from 'react';
import axios from 'axios';
// UI elements 
import {Button, Card, Col, Form, Row, Container} from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';
//profile view components 
import { UserInfo } from './user-info';
import { FavoriteMoviesList } from './favorite-movies-list';

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
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    this.getUser()
  }

  getUser() {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
      axios
        .get(`https://my-flix-movies-app.herokuapp.com/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.setState({
            username: response.data.Username,
            password: response.data.Password,
            email: response.data.Email,
            birthday: response.data.Birthday,
            FavoriteMovies: response.data.FavoriteMovies
          });
        })
        .catch(function (error) {
          console.log(error);
        });
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
      axios.delete(`https://my-flix-movies-app.herokuapp.com/users/${username}`,
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
    const { username, email, birthday, FavoriteMovies } = this.state
console.log(this.state)

    return (
      <Container className="profile-view">
        <UserInfo username={ username } email={ email } birthday={ birthday }/>
      <div className="profile-info">
        <Form className="user-form" onSubmit={(e) => this.editUser(e)}>
          <div>
            <h3>Update Profile</h3>
          </div>
              <Form.Group>
              Username
              <Form.Control type='text' name="Username" placeholder="New Username" onChange={(e) => this.setUsername(e.target.value)} required />
              </Form.Group>
              <Form.Group>
              Password
              <Form.Control type='password' name="Password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} required />
              </Form.Group>
              <Form.Group>
              Email Address
              <Form.Control type='email' name="Email" placeholder="New Email" onChange={(e) => this.setEmail(e.target.value)} required />
              </Form.Group>
              <Form.Group>
              Birthday
              <Form.Control type='date' name="Birthday" onChange={(e) => this.setBirthday(e.target.value)} />
              </Form.Group>
          <Button id="update" variant="primary" type="submit">Update</Button>
        </Form>
      </div>
        <Row>
          <Col>
            <Button id="delete" variant="danger" type="submit" onClick={(e) => this.deleteUser()}>Delete Account</Button>
          </Col>
        </Row>
        <FavoriteMoviesList FavoriteMovies={ FavoriteMovies } onRemoveFavorite={ onRemoveFavorite }/>
      </Container>
    );
  }
}

