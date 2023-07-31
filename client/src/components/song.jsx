import {React, useState, forwardRef, useEffect} from 'react';
import {Grid, Box, Button, Modal, Snackbar} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MuiAlert from '@mui/material/Alert';
import {useSelector} from 'react-redux';
import {getUserById, updateUser} from '../api/user';
import {updateSong} from '../api/song';

function Song(props) {
  const [open, setOpen] = useState(false);
  const [song, setSong] = useState('');
  const [songId, setSongId] = useState('');
  const [variant, setvariant] = useState('outlined');
  const [openalert, setOpenalert] = useState(false);
  const [songLike, setSongLike] = useState(false);
  const [userLike, setUserLike] = useState([]);
  const [msg, setMsg] = useState([]);
  var enableLike;
  const songdata = props.pageData;
  const User = useSelector(state => state.auth.user);
  const [userData, setUserData] = useState([]);
  if (!User) {
    enableLike = false;
  } else {
    enableLike = true;
  }
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  useEffect(() => {
    if (User) {
      getUserById(User).then(res => {
        setUserData(res.data.favourites);
      });
    }
  }, [User]);
  useEffect(() => {
    var flag = false;
    userData.forEach(val => {
      console.log(val._id, songId);
      if (val._id === songId) {
        console.log('b');
        flag = true;
      }
    });
    if (flag) {
      setSongLike(true);
      setvariant('contained');
    } else {
      setSongLike(false);
      setvariant('outlined');
    }
  }, [userData, songId]);

  const alertClick = () => {
    setOpenalert(true);
    console.log(songLike);
    if (songLike) {
      setSongLike(false);
      setMsg('Removed from Favorites.');
      updateSong(songId, {dislike: true}).then(res => {
        console.log(res);
      });
      updateUser(User, {removefavourite: songId}).then(res => {
        console.log(res);
      });
    } else {
      setSongLike(true);
      setMsg('Added to Favorites.');
      updateSong(songId, {like: true}).then(res => {
        console.log(res);
      });
      updateUser(User, {addfavourite: songId}).then(res => {
        console.log(res);
      });
    }
  };
  const alertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenalert(false);
  };
  const style = {
    position: 'absolute',
    bottom: '0%',
    width: '100%',
    textAlign: 'center',
  };
  const handleOpen = (song, id) => {
    setOpen(true);
    setSong(song);
    setSongId(id);
    updateSong(id, {view: true}).then(res => {
      console.log(res);
    });
  };
  const handleClose = () => {
    setOpen(false);
    setSong('');
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center">
      <Grid
        container
        spacing={2}
        style={{padding: '3% 8%'}}
        justifyContent="center"
        alignItems="center">
        {songdata.length > 0 &&
          songdata.map(val => (
            <Grid
              item
              key={val['_id']}
              xs={4}
              md={2}
              style={{textAlign: 'center'}}>
              <Button onClick={e => handleOpen(val['songURL'], val['_id'])}>
                <img
                  alt="song"
                  src={val['imageURL']}
                  style={{width: '100%', borderRadius: '5px'}}
                />
              </Button>
              <br />
              {val['name']}
            </Grid>
          ))}
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Grid container spacing={1}>
            <Grid item xs={11}>
              <iframe
                width="100%"
                height="75"
                src={song}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; 
                    encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
            </Grid>
            <Grid item xs={1}>
              <Button
                disableElevation
                variant={variant}
                onClick={() => {
                  if (variant === 'outlined') {
                    setvariant('contained');
                  } else {
                    setvariant('outlined');
                  }
                  console.log(variant);
                  alertClick();
                }}
                disabled={!enableLike}
                value="web">
                <FavoriteIcon />
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Snackbar open={openalert} autoHideDuration={2000} onClose={alertClose}>
        <Alert onClose={alertClose} severity="success" sx={{width: '100%'}}>
          {msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Song;
