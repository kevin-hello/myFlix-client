import React, { useState } from 'react';

export function RegistrationView(props) {
  const [ usernameReg, setUsernameReg ] = useState('');
  const [ passwordReg, setPasswordReg ] = useState('');
  const [ emailReg, setEmailReg ] = useState('');
  const [ birthdayReg, setBirthdayReg ] = useState('');

  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log(usernameReg, passwordReg, emailReg, birthdayReg);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    // props.onRegister(username);
  };

  return (
    <form>
      <label>
        Username:
        <input required type="text" value={username} onChange={e => setUsernameReg(e.target.value)} />
      </label>
      <label>
        Password:
        <input required type="password" value={password} onChange={e => setPasswordReg(e.target.value)} />
      </label>
      <label>
        Email
        <input required type="email" value={email} onChange={e => setEmailReg(e.target.value)} />
      </label>
      <label>
        Birthday:
        <input required type="date" value={birthday} onChange={e => setBirthdayReg(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );
}