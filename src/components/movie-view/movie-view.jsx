import React from 'react';
import './movie-view.scss';
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';

export class MovieView extends React.Component {



  render() {
    const {movie, onBackClick} = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img width = "100%"  src={movie.ImagePath}/>
          </div>
          <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
        </div>
        <div className="movie-trailer">
        <a href={movie.Trailer} target="_blank">Watch Trailer</a>
        </div>
        <button id="back" onClick={() => { onBackClick(null);}}>Back</button>
       </div>
    );
  }
}