import React from 'react';
import propTypes from 'prop-types';

//UI elements
import { Row, Col, Button, Container} from 'react-bootstrap';

import { BasicMovieCard } from '../basic-movie-card/basic-movie-card';
//styling
import "./genre-view.scss";

export function GenreView ({movie, movies, onBackClick}) {
  
  return(
    <Container>
   
    <Row>
    <Col className="genre-view">
      <div className="genre-name">
        <h1>{movie.Genre.Name}</h1>
      </div>
      <div className="genre-description">
        <span className="value">{movie.Genre.Description}</span>
      </div>
      <Button id="return" variant="primary" onClick={() => onBackClick()}>Back</Button>
    </Col>
    </Row>
    <Row className='genre-movies'>
      <h3>{movie.Genre.Name} Movies</h3>
    </Row>
    <Row className='movie-div'>
    { movies && movies.map((movie) => (
    <Col className='genre-movie-cards' md={3} key={movie._id}>
    <BasicMovieCard movie={movie} />
    </Col> ))}
    </Row>


</Container>

  );
}

GenreView.propTypes = {
  movie: propTypes.shape({
    Genre: propTypes.shape({
      Name: propTypes.string.isRequired,
      Description: propTypes.string.isRequired, 
    }).isRequired
  }).isRequired,
  onBackClick: propTypes.func.isRequired
}