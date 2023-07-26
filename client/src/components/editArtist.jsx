import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/joy/TextField';
import axios from 'axios';
import {updateArtist} from '../api/artist';

function EditArtist(props) {
  const Artist = props.data;

  const handleSubmit = event => {
    event.preventDefault();
    updateArtist(Artist, {
      name: document.getElementById('name').value,
      imageURL: document.getElementById('imgURL').value,
    }).then(res => {
      console.log(res);
    });
  };
  return (
    <form onSubmit={handleSubmit} sx={{justifyContent: 'center'}}>
      <TextField label="Name" id="name" variant="outlined" />
      <TextField label="Image URL" id="imgURL" variant="outlined" />
      <Button
        sx={{mt: 1}}
        fullWidth
        variant="outlined"
        type="submit"
        className="btn btn-primary">
        Save
      </Button>
    </form>
  );
}

export default EditArtist;
