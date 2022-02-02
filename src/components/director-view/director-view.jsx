import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//UI elements 
import { Button } from 'react-bootstrap';
// styling
import "./director-view.scss";

export function DirectorView (props) {
  const { director } = props; 
  console.log(director);
  return(
      <div className="director-view">
          <div className="director-name">
            <span className="label">Name: </span>
            <span className="value">{director.Name}</span> 
          </div>
          <div className="director-bio">
            <span className="label">Biography: </span>
            <span className="value">{director.Bio}</span>     
          </div>  
          <div className="director-birthyear">
            <span className="label">Year of Birth: </span>
            <span className="value">{director.Birth}</span>      
          </div>
          <Link to={`/`}>
            <Button className='return' variant='dark'>Return</Button>
          </Link>
      </div>
 )}