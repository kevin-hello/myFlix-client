import React from 'react'
import Button from 'react-bootstrap/Button';
import './register-button.scss'

export const RegisterButton = (props) => {
  return <Button id= "register" onClick={props.addTrip}>Create Account</Button>
}

export default RegisterButton