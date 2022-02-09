import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";
import { GenreView } from "../genre-view/genre-view";
import { Menubar } from "../navbar/menubar";
import { Row, Col, Container } from "react-bootstrap";

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

import "./main-view.scss";
import { connect } from "react-redux";


class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
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
  

  getMovies(token) {
    axios.get("https://my-flix-movies-app.herokuapp.com/movies", 
    {
    headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
        this.props.setMovies(response.data);
 
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render(){
     let { movies } = this.props;
     let { user } = this.state;
   
    return (
      <Router basename="/myFlix-client">
        <Menubar user={user}/>
        <Container>
        <Row className="main-view justify-content-md-center">
        <Route exact path="/" render={() => {
          if (!user) return <Col>
          <LoginView movies={movies} onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>

          if (movies.length === 0) return <div className="main-view"/>; 

          return <MoviesList movies={movies}/>;
 
        }} />
        <Route path="/register" render={() => {
          if (user) return <Redirect to="/" />
          return <Col>
            <RegistrationView />
          </Col>
        }} />
        <Route path="/movies/:id" render={({ match, history}) => {
          return <Col md={12}>
            <MovieView movie={movies.find(m => m._id === match.params.id)} onBackClick={() => history.goBack()} />
          </Col>
        }} />
        <Route path="/genres/:name" render={({ match, history }) => {
          if (movies.length === 0) return <div className="main-view"/>; 
          return <Col>
          <GenreView movie={movies.find(m => m.Genre.Name === match.params.name)} onBackClick={() => history.goBack()} movies={movies.filter(m => m.Genre.Name === match.params.name)} />
          </Col>
        }} />
        <Route path="/directors/:name" render={({ match, history }) => {
          if (movies.length === 0) return <div className="main-view"/>; 
          return <Col>
          <DirectorView movie={movies.find(m => m.Director.Name === match.params.name)} onBackClick={() => history.goBack()} movies={movies.filter(m => m.Director.Name === match.params.name)} />
          </Col>
        }} />
        <Route path={`/users/${user}`} render={({ history }) => {
          if (!user) return <Redirect to="/" /> 
          return <Col>
          <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
          </Col>
        }} />
        </Row>
        </Container>
      </Router>  
    );
  }
}

let mapStateToProps = state => {
  return{ movies: state.movies }
}
export default connect(mapStateToProps, { setMovies })(MainView);