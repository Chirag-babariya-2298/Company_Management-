import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://employee-system-nodejs.vercel.app/api/company/login",
        loginData
      );
      const { token } = response.data;
      if (token) {
        const expirationTime = Date.now() + 3 * 60 * 60 * 1000 
        localStorage.setItem("token", token);
        localStorage.setItem("tokenExpiration", expirationTime);
        return response.data;
      } else {
        return rejectWithValue("Login failed. User not found.");
      }
    } catch (error) {
      return rejectWithValue("Login failed. Please check your credentials and try again.");
    }
  }
);


const loginSlice = createSlice({
  name: 'login',
  initialState: {
    companyEmail: '',
    password: '',
    isLoggedIn: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    setLoginField: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setLoginField, logoutUser } = loginSlice.actions;

export default loginSlice.reducer;
