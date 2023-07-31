import {React} from 'react';
import TextField from '@mui/joy/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {useNavigate} from 'react-router-dom';
import {addArtist} from '../api/artist';
function AddArtist() {
  const navigate = useNavigate();
  function add(event) {
    event.preventDefault();
    addArtist({
      name: document.getElementById('name').value,
      imageURL: document.getElementById('imgURL').value,
    }).then(res => {
      console.log(res);
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
          <Button sx={{mt: 1}} fullWidth variant="contained" type="submit">
            Save
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default AddArtist;
