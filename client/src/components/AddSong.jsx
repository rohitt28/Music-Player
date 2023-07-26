import {React, useState} from 'react';
import axios from 'axios';
import TextField from '@mui/joy/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {useTheme} from '@mui/material/styles';
import Select from '@mui/material/Select';
import {useNavigate} from 'react-router-dom';
import Container from '@mui/material/Container';
import {getAllArtists} from '../api/artist';
import {addSong} from '../api/song';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function AddSong() {
  const theme = useTheme();
  const [artistName, setArtistName] = useState([]);
  const [pagedata, setpagedata] = useState([]);
  const navigate = useNavigate();

  getAllArtists().then(res => setpagedata(res.data));
  const handleChange = event => {
    const {
      target: {value},
    } = event;
    setArtistName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  function add(event) {
    event.preventDefault();
    addSong({
      name: document.getElementById('name').value,
      imageURL: document.getElementById('imgURL').value,
      songURL: document.getElementById('songURL').value,
      artists: artistName,
    }).then(res => {
      console.log(res.data);
      navigate('/admin', {replace: true});
    });
  }
  return (
    <div>
      <Container maxWidth="xs">
        <form onSubmit={add}>
          <TextField id="name" label="Name" variant="outlined" required />
          <TextField
            id="imgURL"
            label="Image URL"
            variant="outlined"
            required
          />
          <TextField
            id="songURL"
            label="Song URL"
            variant="outlined"
            required
          />
          <InputLabel id="demo-multiple-name-label">Artists</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={artistName}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
            sx={{width: '100%'}}>
            {pagedata.map(data => (
              <MenuItem
                key={data._id}
                value={data._id}
                style={getStyles(data.name, artistName, theme)}>
                {data.name}
              </MenuItem>
            ))}
          </Select>
          <Button sx={{mt: 1}} fullWidth variant="contained" type="submit">
            Save
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default AddSong;
