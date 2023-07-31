import {React, useState, useEffect} from 'react';
import Homenavbar from '../components/Navbar';
import Song from '../components/song';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getUserById} from '../api/user';
import {getAllSongs} from '../api/song';

function Liked() {
  const User = useSelector(state => state.auth.user);
  console.log(User);
  const navigate = useNavigate();
  if (!User) {
    navigate('/', {replace: true});
  }
  const [userLiked, setuserLiked] = useState([]);
  const [songdata, setsongdata] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    getUserById(User).then(res => {
      setuserLiked(res.data.favourites);
    });
    getAllSongs().then(res => {
      setsongdata(res.data);
    });
  }, []);
  useEffect(() => {
    var pagedata = [];

    for (let i = 0; i < songdata.length; i++) {
      for (let j = 0; j < userLiked.length; j++) {
        if (songdata[i]._id === userLiked[j]._id) {
          pagedata.push(songdata[i]);
        }
      }
    }
    console.log(pagedata);
    setData(pagedata);
  }, [songdata, userLiked]);
  return (
    <>
      <Song pageData={data} />
    </>
  );
}

export default Liked;
