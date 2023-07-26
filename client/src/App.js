import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  Login,
  Home,
  Signup,
  User,
  Song,
  Artist,
  Admin,
  Add,
  Liked,
} from './pages';
import { loginUser } from './api/user';
import { loginFail, loginSuccess } from './store/reducers/authReducer';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    loginUser().then((res) => {
      console.log(res, 'txt');
      dispatch(loginSuccess(res));
    });
  }, []);

  return (
    <div className='bg-primary w-screen h-screen flex justify-center items-center'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/user' element={<User />} />
        <Route path='/song' element={<Song />} />
        <Route path='/artist' element={<Artist />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/add' element={<Add />} />
        <Route path='/liked' element={<Liked />} />
        <Route path='/*' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
