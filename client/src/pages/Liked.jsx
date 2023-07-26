import {React, useState, useEffect} from 'react';
import Homenavbar from '../components/homenavbar';
import axios from 'axios';
import Song from '../components/song';
import '../index.css';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getUserById} from '../api/user';
import {getAllSongs} from '../api/song';

function Liked() {
  const User = useSelector(state => state.auth.user);
  console.log(User);
  const navigate = useNavigate();
  if (!User || User === 'null') {
    navigate('/', {replace: true});
  }
  const [userLiked, setuserLiked] = useState([]);
  const [songdata, setsongdata] = useState([]);
  var pagedata = [];
  useEffect(() => {
    getUserById().then(res => {
      setuserLiked(res.data.favourites);
    });
    getAllSongs().then(res => {
      setsongdata(res.data);
    });
  }, []);
  useEffect(() => {
    for (let i = 0; i < songdata.length; i++) {
      for (let j = 0; j < userLiked.length; j++) {
        if (songdata[i]._id === userLiked[j]._id) {
          pagedata.push(songdata[i]);
        }
      }
    }
  }, [songdata, userLiked]);
  return (
    <div className="bg-primary w-screen h-screen">
      <Homenavbar />
      <Song pageData={pagedata} />
    </div>
  );
}

export default Liked;
