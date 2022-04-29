import React from 'react';
import axios from 'axios';
import propTypes from 'prop-types';

import { Link } from 'react-router-dom';
//UI components 
import {Col, Row, Button} from 'react-bootstrap';
//styling
import './movie-view.scss';


export class MovieView extends React.Component {

constructor(props) {
  super(props);
}

  addFavoriteMovie() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.post(`https://my-flix-movies-app.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}`},
      method: 'POST'
    })
    .then(response => {
      alert('Movie has been added to your favorites')
    })
    .catch(function(error){
      console.log(error);
    });
  };

  render() {
    const {movie, onBackClick} = this.props;

    return (
      <Row className="movie-view">
        <Col sm={12} md={4} className="movie-poster">
          <img height = "auto" width="100%"  src={movie.ImagePath}/>
          </Col>
          <Col sm={12} md={8}>
          <h2>{movie.Title}</h2>
        <div className="movie-description">
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">{movie.Genre.Name}</Button>
          </Link>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">{movie.Director.Name}</Button>
          </Link>
        </div>
        <div className="movie-trailer">
        <a href={movie.Trailer} target="_blank">Watch Trailer</a>
        </div>
        <Button variant="primary" id="back" onClick={() => { onBackClick(null);}}>Back</Button>
        <Button variant="danger" id="favmovie" value={movie._id} onClick={(e) => this.addFavoriteMovie(e, movie)}>Add to favorites</Button>
        </Col>
       </Row>
    );
  }
}

MovieView.propTypes = {
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
  user: propTypes.shape({
    Username: propTypes.string.isRequired,
    FavoriteMovies: propTypes.array.isRequired
  }).isRequired,
  addFavoriteMovie: propTypes.func.isRequired,
  onBackClick: propTypes.func.isRequired
};