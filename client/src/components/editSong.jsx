import {React, useState} from 'react';
import axios from 'axios'
import TextField from '@mui/joy/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import Select from '@mui/material/Select';

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

function EditSong(props) {
    const Song=props.data;
    const theme = useTheme();
    const [artistName, setArtistName] = useState([]);
    const [pagedata, setpagedata] = useState([]);
    axios.get( "http://localhost:4000/api/artist/get/",
    ).then((res) => {
      setpagedata(res.data.data);
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setArtistName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
    const handleSubmit=(event)=>{
        event.preventDefault();
        if(document.getElementById("name").value){
            axios.put('http://localhost:4000/api/song/update/'+Song,{
            'name':document.getElementById("name").value,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            })
        }
        if(document.getElementById("imgURL").value){
            axios.put('http://localhost:4000/api/song/update/'+Song,{
            'imageURL':document.getElementById("imgURL").value,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            })
        }
        if(document.getElementById("songURL").value){
            axios.put('http://localhost:4000/api/song/update/'+Song,{
            'songURL':document.getElementById("songURL").value,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            })
        }
        if(artistName.length>0){
            axios.put('http://localhost:4000/api/song/update/'+Song,{
            'artists':artistName,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            })
        }
    }
  return (
    <form onSubmit={handleSubmit} sx={{justifyContent: 'center',ml:2, mr:2}}>
        <TextField label="Name" id="name" variant="outlined"/>
        <TextField label="Image URL" id="imgURL" variant="outlined"/>
        <TextField label="Song URL" id="songURL" variant="outlined" />
        <InputLabel id="demo-multiple-name-label">Artists</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={artistName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {pagedata.map((data) => (
            <MenuItem 
              key={data._id}
              value={data._id}
              style={getStyles(data.name, artistName, theme)}
            >
              {data.name}
            </MenuItem>
          ))}
        </Select>
        <Button sx={{mt:1}} fullWidth variant='outlined' type="submit" className="btn btn-primary">
            Save
        </Button>
    </form>
  )
}

export default EditSong