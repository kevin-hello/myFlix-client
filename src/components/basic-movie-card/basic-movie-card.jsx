import React from 'react';
import propTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import './basic-movie-card.scss';

import { Link } from 'react-router-dom';

export class BasicMovieCard extends React.Component {

  render() {
    const { movie } = this.props;
    return (
  <Link to={`/movies/${movie._id}`} className="simp-card-content">
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath}/>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.Title}</Card.Title>
        <Link to={`/movies/${movie._id}`}>
          <Button id="seemore" variant="link" >See More</Button>
        </Link>
      </Card.Body>
    </Card>
  </Link>
    );
  }
} 

BasicMovieCard.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    Genre: propTypes.shape({
      Name: propTypes.string.isRequired,
      Description: propTypes.string.isRequired}), 
    Director: propTypes.shape({
      Name: propTypes.string.isRequired,
      Bio: propTypes.string.isRequired}),
    ImagePath: propTypes.string.isRequired,
    Featured: propTypes.boolean,
    Trailer: propTypes.string.isRequired,
  }).isRequired
};