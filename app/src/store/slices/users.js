import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setUserToken } from '../../utils';

const initialState = {
  user: null,
  error: null,
};

const authenticate = createAsyncThunk('authenticate', async ({ token }) => {
  try {
    const { data: auth } = await axios.get(
      'http://localhost:3001/api/users/auth',
      {
        headers: {
          authorization: token,
        },
      }
    );
    return auth;
  } catch (error) {
    console.error(error);
  }
});

const signUp = createAsyncThunk('signUp', async ({ username, password }) => {
  try {
    const { data } = await axios.post(
      'http://localhost:3001/api/users/signup',
      {
        username,
        password,
      }
    );
    setUserToken(data.token);
    return {};
  } catch (error) {
    console.error(error);
    return { error };
  }
});

const login = createAsyncThunk('login', async ({ username, password }) => {
  try {
    const { data } = await axios.post('http://localhost:3001/api/users/login', {
      username,
      password,
    });
    setUserToken(data.token);
    return {};
  } catch (error) {
    console.error(error);
    return { error };
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, { payload: user }) => {
      state.user = user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authenticate.fulfilled, (state, { payload: user }) => {
      return { ...state, user };
    });
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      if (payload.error) {
        return { ...state, error: 'Something went wrong.' };
      }
      return state;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      if (payload.error) {
        if (payload.error.response.status === 401) {
          return { ...state, error: 'Unauthorized' };
        }
        return { ...state, error: 'Something went wrong.' };
      }
      return state;
    });
  },
});

const { setUser } = usersSlice.actions;

export { authenticate, login, signUp, setUser };

export default usersSlice.reducer;
