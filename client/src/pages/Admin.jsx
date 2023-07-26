import {React, useState, useEffect} from 'react';
import {DataGrid, gridColumnsTotalWidthSelector} from '@mui/x-data-grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EditArtist from '../components/editArtist';
import EditSong from '../components/editSong';
import CloseIcon from '@mui/icons-material/Close';
import Homenavbar from '../components/homenavbar';
import {useNavigate} from 'react-router-dom';
import {Typography} from '@mui/material';
import {Container} from '@mui/material';
import {useSelector} from 'react-redux';
import {deleteArtist, getAllArtists} from '../api/artist';
import {getAllSongs} from '../api/song';

var columns;
var rows;

export default function Admin() {
  const [value, setValue] = useState('artist');
  const [artistdata, setartistdata] = useState('');
  const [songdata, setsongdata] = useState('');
  const [currEdit, seteditdata] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  var rowdata = [];
  var editdata = <EditArtist data={currEdit} />;
  const isAdmin = useSelector(state => state.auth.isAdmin);
  const navigate = useNavigate();
  if (!isAdmin) {
    navigate('/', {replace: true});
  }

  const handleChange = event => {
    setValue(event.target.value);
    setdata();
  };
  var style1 = {
    height: 400,
  };
  function change(event) {
    handleOpen();
    seteditdata(event);
  }
  function del(event) {
    if (!window.confirm('Do you want to delete this entry?')) {
      return;
    }
    if (value === 'song') {
      axios
        .delete('http://localhost:4000/api/song/delete/' + event)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    } else {
      let flag = true;
      for (let i = 0; i < songdata.length; i++) {
        for (let j = 0; j < songdata[i]['artists'].length; j++) {
          if (event === songdata[i]['artists'][j]) {
            flag = false;
          }
        }
      }
      if (flag) {
        deleteArtist(event).then(res => {
          console.log(res.data);
        });
      } else {
        alert('This artist has a song.');
      }
    }
  }
  function update() {
    window.localStorage.setItem('add', value);
    navigate('/add', {replace: false});
  }
  useEffect(() => {
    getAllArtists().then(res => {
      setartistdata(res.data);
    });
    getAllSongs().then(res => {
      setsongdata(res.data);
    });
  }, []);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1,
  };
  const setdata = () => {
    if (value === 'artist') {
      columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'name', headerName: 'Name', width: 130},
        {
          field: 'imageURL',
          headerName: 'Image',
          width: 70,
          renderCell: params => <img alt="artist" src={params.value} />,
        },
        {
          field: 'action',
          headerName: 'Action',
          width: 130,
          renderCell: params => (
            <>
              <Button onClick={e => change(params.value)}>
                <EditIcon />
              </Button>
              <Button onClick={e => del(params.value)}>
                <DeleteIcon />
              </Button>
            </>
          ),
        },
      ];
      rowdata = artistdata;
      editdata = <EditArtist data={currEdit} />;
    } else {
      columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'name', headerName: 'Name', width: 130},
        {
          field: 'imageURL',
          headerName: 'Image',
          width: 70,
          renderCell: params => <img alt="song" src={params.value} />,
        },
        {
          field: 'action',
          headerName: 'Action',
          width: 160,
          renderCell: params => (
            <>
              <Button onClick={e => change(params.value)}>
                <EditIcon />
              </Button>
              <Button onClick={e => del(params.value)}>
                <DeleteIcon />
              </Button>
            </>
          ),
        },
      ];
      rowdata = songdata;
      editdata = <EditSong data={currEdit} />;
    }
    rows = [];
    for (let i = 0; i < rowdata.length; i++) {
      rowdata[i]['id'] = i + 1;
      rowdata[i]['action'] = rowdata[i]['_id'];
    }
    if (rowdata) {
      rowdata.map(item => rows.push(item));
    }
  };
  setdata();
  var element = <></>;
  if (columns) {
    element = (
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        sx={style1}
      />
    );
  }
  return (
    <div className="bg-primary w-screen h-screen">
      <Homenavbar />
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}>
                <FormControlLabel
                  value="artist"
                  control={<Radio />}
                  label="Artists"
                />
                <FormControlLabel
                  value="song"
                  control={<Radio />}
                  label="Songs"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={update} variant="contained">
              Add New
            </Button>
          </Grid>
        </Grid>
        {element}
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Box display="flex" alignItems="center">
            <Box flexGrow={1} textAlign={'center'}>
              <Typography component="h1" variant="h5">
                Edit
              </Typography>
            </Box>
            <Box>
              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </Box>
          </Box>
          {editdata}
        </Box>
      </Modal>
    </div>
  );
}
