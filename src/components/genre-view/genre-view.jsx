import React from 'react';
import { Link } from 'react-router-dom';
//UI elements
import { Col, Button} from 'react-bootstrap';
//styling
import "./genre-view.scss";

export class GenreView extends React.Component {
  render(){
  const {genre, onBackClick } = this.props;
  
  return(
    <Col className="genre-view">
      <div className="genre-name">
        <span className="label">Name: </span>
        <span className="value">{genre.Name}</span>
      </div>
      <div className="genre-description">
        <span className="label">Description: </span>
        <span className="value">{genre.Description}</span>
      </div>
      <Link to={`/`}>
      <Button id="return" variant="secondary" onClick={() => onBackClick(null)}>Back</Button>
      </Link>

    </Col>
  );
}}