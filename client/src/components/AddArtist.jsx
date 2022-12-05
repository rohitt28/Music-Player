import {React} from 'react';
import axios from 'axios'
import TextField from '@mui/joy/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";

function AddArtist() {
  const navigate = useNavigate();
  function add(event){
    event.preventDefault();
    axios.post( "http://localhost:4000/api/artist/add/",{
      'name':document.getElementById("name").value,
      'imageURL':document.getElementById("imgURL").value,
      }
      ).then((res) => {
          console.log(res);
          navigate("/admin", { replace: true });
      })
      .catch((err) => {
          console.log(err.response.data.message);
      });
  }
  return (
    <div>
      <Container maxWidth="xs">
        <form onSubmit={add}>
          <TextField id="name" label="Name" variant="outlined" required/>
          <TextField id="imgURL" label="Image URL" variant="outlined" required/>
          <Button sx={{mt:1}} fullWidth variant ="contained" type="submit">Save</Button>
        </form>
      </Container>
    </div>
  )
}

export default AddArtist