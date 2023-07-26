import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
    isAdmin: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.isAdmin = action.payload.isAdmin;
    },
    loginFail: state => {
      state.isLoggedIn = false;
      state.user = null;
      state.isAdmin = false;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.user = null;
      state.isAdmin = false;
    },
  },
});

export const {loginSuccess, loginFail, logout, resetAttempt} =
  authSlice.actions;
export default authSlice.reducer;
