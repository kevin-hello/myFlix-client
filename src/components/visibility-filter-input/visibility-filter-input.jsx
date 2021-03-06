import React from 'react';
import { connect } from 'react-redux';

import { Form } from 'react-bootstrap';

import "./visibility-filter-input.scss";

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return ( <Form.Control
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder="Search Movie Titles..."
  />
  );  
}

export default connect(null, { setFilter })(VisibilityFilterInput);
