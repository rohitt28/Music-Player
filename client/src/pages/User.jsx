import {React, useState, useEffect} from 'react';
import axios from 'axios';
import Homenavbar from '../components/homenavbar';
import TextField from '@mui/joy/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {useNavigate} from 'react-router-dom';
import {getUserById} from '../api/user';
import {useSelector} from 'react-redux';
import {updateUser} from '../api/user';
const bcrypt = require('bcryptjs');

function User() {
  const User = useSelector(state => state.auth.user);
  const [data, setdata] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (User) {
      getUserById(User).then(res => {
        setdata(res.data);
      });
    } else {
      navigate('/', {replace: true});
    }
  }, [User]);
  function change(event) {
    event.preventDefault();
    if (
      !bcrypt.compareSync(
        document.getElementById('currPass').value,
        data['password'],
      )
    ) {
      alert('Incorrect Password');
      return;
    }
    updateUser(User, {
      email: document.getElementById('email').value,
      password: document.getElementById('newPass').value,
    }).then(res => {
      console.log(res);
    });
  }
  return (
    <div className="bg-primary w-screen h-screen">
      <Homenavbar />
      <Container maxWidth="xs">
        <form onSubmit={change}>
          <TextField
            label="Username"
            placeholder={User}
            disabled
            variant="outlined"
          />
          <TextField
            id="email"
            label="Email"
            placeholder={data['email']}
            variant="outlined"
          />
          <TextField
            id="currPass"
            label="Current Password"
            type="password"
            variant="outlined"
            required
          />
          <TextField
            id="newPass"
            label="New Password"
            type="password"
            variant="outlined"
          />
          <TextField
            label="Confirm New Password"
            type="password"
            variant="outlined"
          />
          <Button sx={{mt: 1}} fullWidth variant="contained" type="submit">
            Save
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default User;
