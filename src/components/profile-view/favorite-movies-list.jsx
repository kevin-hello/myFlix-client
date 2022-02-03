import React from 'react';
import {Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';

//movie card component for favorites list 
import { MovieCard } from '../movie-card/movie-card';

// styling 
import './profile-view.scss';

export function FavoriteMoviesList({ FavoriteMovies, onRemoveFavorite }) {


return(
  <div>
    <h3>Favorite Movies</h3>
  <Row>
  { FavoriteMovies && FavoriteMovies.map((movie) => (
    <Col md={4} key={movie._id}>
      <div className="favoriteMovieDiv" >
        <MovieCard movie={movie} />
        <Button bg="danger" variant="danger" className="unfav-button" value={movie._id} onClick={(e) => onRemoveFavorite(e, movie)}>
        Delete From Favorites
        </Button>
      </div>
    </Col> ))}
  </Row>
</div>
)}







