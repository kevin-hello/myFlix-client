import React from 'react';
import propTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath}/>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Button className="mt-auto"onClick={() => onMovieClick(movie)} variant="link">Open</Button>
      </Card.Body>
      </Card>
    );
  }
} 

MovieCard.propTypes = {
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
  }).isRequired,
  onMovieClick: propTypes.func.isRequired
};