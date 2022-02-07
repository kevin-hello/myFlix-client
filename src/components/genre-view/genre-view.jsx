import React from 'react';
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
        <span className="label">Description: </span>
        <span className="value">{movie.Genre.Description}</span>
      </div>
      <Button id="return" variant="secondary" onClick={() => onBackClick()}>Back</Button>
    </Col>
    </Row>
    <Row className='genre-title'>
      <h3>{movie.Genre.Name} Movies</h3>
    </Row>
    <Row>
    { movies && movies.map((movie) => (
    <Col md={3} key={movie._id}>
    <div className="genreMovieDiv" >
    <BasicMovieCard movie={movie} />
    </div>
    </Col> ))}
    </Row>


</Container>

  );
}