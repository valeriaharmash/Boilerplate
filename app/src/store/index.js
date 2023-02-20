import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import usersSlice, {
  authenticate,
  login,
  signUp,
  setUser,
} from './slices/users';

const store = configureStore({
  reducer: {
    users: usersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createLogger()),
});

export { authenticate, login, signUp, setUser };

export default store;
