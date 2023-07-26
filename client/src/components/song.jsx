import {React, useState, forwardRef} from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {useSelector} from 'react-redux';

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
  if (!User || User === 'null') {
    enableLike = false;
  } else {
    enableLike = true;
  }
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const alertClick = () => {
    setOpenalert(true);
    console.log(songLike);
    if (songLike) {
      setSongLike(false);
      setMsg('Removed from Favorites.');
      axios
        .put('http://localhost:4000/api/song/update/' + songId, {
          dislike: true,
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
      axios
        .put('http://localhost:4000/api/user/update/' + User, {
          removefavourite: songId,
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    } else {
      setSongLike(true);
      setMsg('Added to Favorites.');
      axios
        .put('http://localhost:4000/api/song/update/' + songId, {
          like: true,
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
      axios
        .put('http://localhost:4000/api/user/update/' + User, {
          addfavourite: songId,
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err.response.data.message);
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
    backgroundColor: 'black',
    textAlign: 'center',
  };
  const test = tmp => {
    axios
      .get('http://localhost:4000/api/user/get/' + User)
      .then(res => {
        setUserLike(res.data.data.favourites);
        var qry = res.data.data.favourites.find(element => element._id === tmp);
        if (qry) {
          setSongLike(true);
          setvariant('contained');
        } else {
          setSongLike(false);
          setvariant('outlined');
        }
      })
      .catch(err => {
        console.log(err.response.data.message);
      });
  };
  const handleOpen = (song, id) => {
    setOpen(true);
    setSong(song);
    setSongId(id);
    axios
      .put('http://localhost:4000/api/song/update/' + id, {
        view: true,
      })
      .then(res => {
        test(id);
      })
      .catch(err => {
        console.log(err.response.data.message);
      });
  };
  const handleClose = () => {
    setOpen(false);
    setSong('');
  };
  return (
    <>
      <div>
        <span className="font-link">
          <Grid id="tmp" container spacing={1} className="justify-center">
            {songdata.length > 0 &&
              songdata.map(room => (
                <Grid
                  item
                  key={room['_id']}
                  xs={4}
                  md={2}
                  style={{textAlign: 'center'}}>
                  <Button
                    onClick={e => handleOpen(room['songURL'], room['_id'])}>
                    <img alt="song" src={room['imageURL']} />
                  </Button>
                  <br />
                  {room['name']}
                </Grid>
              ))}
          </Grid>
        </span>
      </div>
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
    </>
  );
}

export default Song;
