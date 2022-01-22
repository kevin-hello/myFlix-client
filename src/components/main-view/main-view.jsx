import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";
import { GenreView } from "../genre-view/genre-view";
import { UserUpdate } from "../user-update/user-update";
import  Menubar  from "../navbar/menubar";
import { Row, Col, Container } from "react-bootstrap";

import "./main-view.scss";


export default class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      user: null
    };
  }
  componentDidMount(){
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
    this.setState({
    user: localStorage.getItem("user")
    });
    this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);

  }
  
  // onLoggedOut() {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   this.setState({
  //     user:null
  //   });
  // }

  getMovies(token) {
    axios.get("https://my-flix-movies-app.herokuapp.com/movies", 
    {
    headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render(){
     const { movies, user } = this.state;
   
    return (
      <Router>
        <Menubar user={user}/>
        <Container>
        <Row className="main-view justify-content-md-center">
        <Route exact path="/" render={() => {
          if (!user) return <Col>
          <LoginView movies={movies} onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>

          if (movies.length === 0) return <div className="main-view"/>; 

          return movies.map(m => (
            <Col md={3} key={m._id}>
            <MovieCard movie={m}/>
            </Col>
          ))
        }} />
        <Route path="/register" render={() => {
          if (user) return <Redirect to="/" />
          return <Col lg={8} md={8}>
            <RegistrationView />
          </Col>
        }} />
        <Route path="/movies/:id" render={({ match, history}) => {
          return <Col md={8}>
            <MovieView movie={movies.find(m => m._id === match.params.id)} onBackClick={() => history.goBack()} />
          </Col>
        }} />
        <Route path="/directors/:name" render={({ match }) => {
          return <Col>
          <DirectorView movie={movies.find(m => m._id === match.params.id)} onBackClick={() => history.goBack()} />
          </Col>
        }} />
        <Route path="/directors/:name" render={({ match }) => {
          return <Col>
          <DirectorView movie={movies.find(m => m._id === match.params.id)} onBackClick={() => history.goBack()} />
          </Col>
        }} />
        <Route path={`/users/${user}`} render={({ match, history }) => {
          if (!user) return <Redirect to="/" /> 
          return <Col>
          <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
          </Col>
        }} />
        <Route path={`/user-update/${user}`} render ={({ match, history }) => {
          if (!user) return <Redirect to="/" />
          return <Col>
            <UserUpdate user={user} onBackClick={() => history.goBack()} />
          </Col>
        }} />










        {/* <Route exact path="/movies/:movieId" render={({ match }) => {
          return <Col md={8}>
          <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()}/>
          </Col>
        }} />
        <Route exact path="/genres/:name" render={({match}) => {
        // if (movies.length === 0) return <div className="main-view" />;
        return <Col md={8}>
          <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()}/>
        </Col>

        }} />
        <Route path="/directors/:name" render={({ match }) => {
        // if (movies.length === 0) return <div className="main-view" />;
        return <Col md={8}>
        <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()}/>
        </Col>
        }} /> */}
        </Row>
        </Container>
      </Router>
     

    )

  }

  // render() {
  //   const { movies, selectedMovie, user} = this.state;
    
  //   if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

  //   if (selectedMovie) return <MovieView movie={selectedMovie}  onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />;

  //   if (movies.length === 0) return <div className="main-view"/>;
    
  //   return(
  //     <Row auto className="main-view justify-content-md-center">
  //     {selectedMovie
  //       ? (
          
  //         <Col md={8}>
  //           <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
  //         </Col>
  //       )
  //       : movies.map(movie => (
  //         <Col className="moviecard" sm={12} md={6} lg={4} xl={3} >
  //           <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
  //         </Col>
  //       ))
  //     }
  //   </Row>
  // );
  // }
}

{/* <button onClick={() => { this.onLoggedOut() }}>Logout</button> */}