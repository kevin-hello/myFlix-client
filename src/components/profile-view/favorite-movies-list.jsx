import React from 'react';
import {Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';

//movie card component for favorites list 
import { MovieCard } from '../movie-card/movie-card';

// styling 
import './profile-view.scss';

export function FavoriteMoviesList({ FavoriteMovies }) {

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
return(
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
)}







