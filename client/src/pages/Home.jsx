import {React, useState, useEffect} from 'react';
import Homenavbar from '../components/homenavbar';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import Song from '../components/song';
import '../index.css';
import {useSelector} from 'react-redux';
import {getAllSongs} from '../api/song';

function Home() {
  const [topViewed, setTopViewed] = useState([]);
  const [topLiked, setTopLiked] = useState([]);
  useEffect(() => {
    getAllSongs('views', 5).then(res => {
      setTopViewed(res.data);
    });
    getAllSongs('likes', 5).then(res => {
      setTopLiked(res.data);
    });
  }, []);
  return (
    <div className="bg-primary h-screen overflow-auto">
      <div className="font-link">
        <Homenavbar />
        Top Viewed:
        <br />
        <Song pageData={topViewed} />
        <Divider />
        Top Liked:
        <br />
        <Song pageData={topLiked} />
      </div>
    </div>
  );
}

export default Home;
