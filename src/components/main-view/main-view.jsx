import React from 'react';
import axios from 'axios';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Row, Col } from 'react-bootstrap';
import './main-view.scss';


export default class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
    };
  }

  componentDidMount(){
    axios.get('https://my-flix-movies-app.herokuapp.com/movies')
    .then(response => {
      this.setState({ movies: response.data});
    })
    .catch(error => {
      console.log(error);
    });
  }
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie, user} = this.state;
    
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (selectedMovie) return <MovieView movie={selectedMovie}  onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />;

    if (movies.length === 0) return <div className="main-view"/>;
    
    return (
      <Row auto className="main-view justify-content-md-center">
      {selectedMovie
        ? (
          
          <Col md={8}>
            <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          </Col>
        )
        : movies.map(movie => (
          <Col className="moviecard" sm={12} md={12} lg={4} xl={3} >
            <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          </Col>
        ))
      }
    </Row>
  );
  }
}
