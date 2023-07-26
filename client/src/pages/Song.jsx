import {minHeight} from '@mui/system';
import {React} from 'react';
import Navbar from '../components/navbar';

function Song() {
  const User = window.localStorage.getItem('user');
  return (
    <div className="bg-primary h-screen overflow-auto">
      <Navbar user={User} activePage="songs" />
      <br />
    </div>
  );
}

export default Song;
