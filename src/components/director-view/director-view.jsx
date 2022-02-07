import React from 'react';
import Moment from 'react-moment';

//UI elements 
import { Container, Row, Col, Button } from 'react-bootstrap';

import { BasicMovieCard } from '../basic-movie-card/basic-movie-card';


// styling
import "./director-view.scss";

export function DirectorView({ movie, movies, onBackClick }) {
  

  return(
    <Container>
    <Row>
      <Col className="director-view">
        <h1>{movie.Director.Name}</h1>
        <div className="director-bio">
            <span className="label">Biography: </span>
            <span className="value">{movie.Director.Bio}</span>    
          </div>  
          <div className="director-birthyear">
            <span className="label">Year of Birth: </span>
            <Moment format="YYYY">
            {movie.Director.Birth}
            </Moment>
          </div>
        <Button id="return" variant="secondary" onClick={() => onBackClick()}>Back</Button>
      </Col>
    </Row>
    <Row className='director-movies'>
      <h3>{movie.Director.Name} Movies</h3>
    </Row>
    <Row className='movie-div'>
      { movies && movies.map((movie) => (
      <Col className='dir-movie-cards' md={3} key={movie._id}>
        <BasicMovieCard movie={movie} />
      </Col> ))}
    </Row>

</Container>
 );
}
