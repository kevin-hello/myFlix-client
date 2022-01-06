import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return (
      <a style={{ cursor: "pointer" }} onClick={() => onMovieClick(movie)} variant="link">
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath}/>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Button className="mt-auto"onClick={() => onMovieClick(movie)} variant="link">Open</Button>
      </Card.Body>
      </Card>
      </a>
    );
  }
} 

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired}), 
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired}),
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.boolean,
    Trailer: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};