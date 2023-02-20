import { useEffect } from 'react';
import { isLoggedIn, getUserToken, removeUserToken } from '../utils';
import './App.css';
import Auth from './Auth';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate, setUser } from '../store';

function App() {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (isLoggedIn()) {
      dispatch(authenticate({ token: getUserToken() }));
    }
  }, [dispatch]);

  if (!error && isLoggedIn() && !user) return null;

  return (
    <div className="App">
      <header className="header row apart center">
        <h1>Boilerplate</h1>
        {user && (
          <div className="row">
            <p>{user.username}</p>
            <button
              onClick={() => {
                removeUserToken();
                dispatch(setUser(null));
              }}
            >
              Log Out
            </button>
          </div>
        )}
      </header>
      {!user ? <Auth /> : <h3>Your content here</h3>}
    </div>
  );
}

export default App;
