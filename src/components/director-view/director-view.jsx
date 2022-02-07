import React from 'react';

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
            <span className="value">{movie.Director.Birth}</span>      
          </div>
        <Button id="return" variant="secondary" onClick={() => onBackClick()}>Back</Button>
      </Col>
    </Row>
    <Row className='director-title'>
      <h3>{movie.Director.Name} Movies</h3>
    </Row>
    <Row>
      { movies && movies.map((movie) => (
      <Col md={3} key={movie._id}>
        <div className="directorMovieDiv" >
        <BasicMovieCard movie={movie} />
        </div>
      </Col> ))}
    </Row>

</Container>
 );
}
