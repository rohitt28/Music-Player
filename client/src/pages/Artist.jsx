import {React} from 'react';
import Navbar from '../components/navbar';

function Artist() {
  return (
    <div className="bg-primary h-screen overflow-auto">
      <Navbar activePage="artists" />
    </div>
  );
}

export default Artist;
