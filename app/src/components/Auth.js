import './Auth.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authenticate, login, signUp } from '../store';
import { getUserToken } from '../utils';

const Auth = () => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (username && password) {
      if (mode === 'login') {
        await dispatch(
          login({
            username,
            password,
          })
        );
      } else {
        await dispatch(
          signUp({
            username,
            password,
          })
        );
      }
      dispatch(authenticate({ token: getUserToken() }));
      setUsername('');
      setPassword('');
      setMode('login');
    }
  };

  return (
    <div className="center">
      <form className="column" onSubmit={handleSubmit}>
        <div className="apart">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
        </div>
        <div className="apart">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>

        {mode === 'login' && (
          <button onClick={() => setMode('signup')}>Create new account</button>
        )}
        <button type="submit">{mode === 'login' ? 'Log In' : 'Sign Up'}</button>
      </form>
    </div>
  );
};

export default Auth;
