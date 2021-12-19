import React, { useState } from 'react';
import { RegistrationView } from '../registration-view/registration-view';
import { RegisterButton } from '../registration-view/register-button';
export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState('login');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication / / then call props.onLoggedIn(username) */
    props.onLoggedIn(
      username
    );
  };

  return (
    <div>
    <div>
        {state === 'login' && (
          <form>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        )}

        {state === 'register' && <RegistrationView />}
      </div>
      <div>
      {state === 'login' && (
          <RegisterButton addTrip={() => setState('register')} />
        )}
      </div>
      </div>
  );
}