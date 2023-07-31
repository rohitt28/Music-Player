import {React, useState, useEffect} from 'react';
import Homenavbar from '../components/Navbar';
import {Divider, Box, Typography} from '@mui/material';
import Song from '../components/song';
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
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center">
      <Typography variant="h5">Top Viewed:</Typography>
      <Song pageData={topViewed} />
      <Divider />
      <Typography variant="h5">Top Liked:</Typography>
      <Song pageData={topLiked} />
    </Box>
  );
}

export default Home;
