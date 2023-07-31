import {React, useState, useEffect} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Grid,
  Button,
  Box,
  Modal,
  Typography,
  Container,
} from '@mui/material';
import {Edit, Delete, Close} from '@mui/icons-material';
import EditArtist from '../components/editArtist';
import EditSong from '../components/editSong';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {deleteArtist, getAllArtists} from '../api/artist';
import {deleteSong, getAllSongs} from '../api/song';
import {getColumns} from '../utils/gridConfigs';

export default function Admin() {
  const [value, setValue] = useState('artist');
  const [artistdata, setartistdata] = useState([]);
  const [songdata, setsongdata] = useState([]);
  const [editData, setEditData] = useState('');
  const [currEdit, seteditdata] = useState('');
  const [open, setOpen] = useState(false);
  const columns = getColumns(change, del);
  const [rows, setRows] = useState([]);
  const [element, setElement] = useState(<></>);
  const isAdmin = useSelector(state => state.auth.isAdmin);
  const navigate = useNavigate();
  if (!isAdmin) {
    navigate('/', {replace: true});
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = event => {
    setValue(event.target.value);
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
      deleteSong(event).then(res => {
        console.log(res.data);
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

  useEffect(() => {
    var rowdata = [];
    if (value === 'artist') {
      rowdata = artistdata;
      setEditData(<EditArtist data={currEdit} />);
    } else {
      rowdata = songdata;
      setEditData(<EditSong data={currEdit} />);
    }
    const tmpRows = [];
    for (let i = 0; i < rowdata.length; i++) {
      rowdata[i]['id'] = i + 1;
      rowdata[i]['action'] = rowdata[i]['_id'];
    }
    if (rowdata) {
      rowdata.map(item => tmpRows.push(item));
    }
    setRows(tmpRows);
  }, [artistdata, currEdit, songdata, value]);
  useEffect(() => {
    if (columns && rows) {
      setElement(
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          sx={{height: 400}}
        />,
      );
    }
  }, [rows, columns]);
  return (
    <>
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
                <Close />
              </Button>
            </Box>
          </Box>
          {editData}
        </Box>
      </Modal>
    </>
  );
}
