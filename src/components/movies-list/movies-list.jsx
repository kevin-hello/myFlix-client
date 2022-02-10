import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { MovieCard } from '../movie-card/movie-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;


if (visibilityFilter !== '' ) {
  filteredMovies = movies.filter(m=> m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
}

if (!movies) return <div className="main-view"/>;

return <>
    <Col md={12} className="search-bar">
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </Col>
    {filteredMovies.map(m=> (
    <Col className="card-div"sm={12} md={6} lg={4} key={m._id}>
      <MovieCard movie={m}/>
    </Col>
))}
</>;
}
export default connect(mapStateToProps)(MoviesList);

