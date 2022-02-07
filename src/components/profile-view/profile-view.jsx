import React from 'react';
import axios from 'axios';
// UI elements 
import {Button, Col, Form, Row, Container } from 'react-bootstrap';

//profile view components 
import { UserInfo } from './user-info';

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
        window.open("/myFlix-client/",'_self'); 
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
      window.open(`/myFlix-client/users/${username}`,'_self'); 
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
          <h3>Update Profile</h3>
          <Col>
            <div class="form-group">
              <input type="text" id="username" name="Username" class="form-control" onChange={(e) => this.setUsername(e.target.value)} required/>
              <label class="form-control-placeholder" for="username">New Username</label>
            </div>
            <div class="form-group">
              <input type="password" id="password" name="Password" class="form-control" onChange={(e) => this.setPassword(e.target.value)} required/>
              <label class="form-control-placeholder" for="password">New Password</label>
            </div>
            <div class="form-group">
              <input type="email" id="email" name="Email" class="form-control" onChange={(e) => this.setEmail(e.target.value)} required/>
              <label class="form-control-placeholder" for="email">New Email</label>
            </div>
            <div class="form-group">
              <input type="date" id="birthday" name="Birthday" class="form-control" onChange={(e) => this.setBirthday(e.target.value)} required/>
              <label class="form-control-placeholder" for="birthday">New Birthday</label>
            </div>
          </Col>
          <Button id="update" variant="primary" type="submit">Update</Button>
          </Form>
        </div>
          <Row>
            <Col>
              <Button id="delete" variant="danger" type="submit" onClick={(e) => this.deleteUser()}>Delete Account</Button>
            </Col>
          </Row>
        <div>
        <h3>Favorite Movies</h3>
        <Row>
         { FavoriteMovies && FavoriteMovies.map((movie) => (
        <Col md={4} key={movie._id}>
        <div className="favoriteMovieDiv" >
        <MovieCard movie={movie} />
        <Button bg="danger" variant="danger" className="unfav-button" value={movie._id} onClick={(e) => this.onRemoveFavorite(e, movie)}>
        Delete From Favorites
        </Button>
        </div>
        </Col> ))}
        </Row>
        </div>
      </Container>
    );
  }
}

