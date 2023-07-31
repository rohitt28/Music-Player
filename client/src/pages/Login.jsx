import {React, useState} from 'react';
import './Login.css';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {loginFail, loginSuccess} from '../store/reducers/authReducer';
import {loginUser} from '../api/user';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await loginUser({username: username, password: password});
      if (res) {
        dispatch(loginSuccess({...res, attempt: 'success'}));
        console.log({...res, attempt: 'success'});
        navigate('/');
      }
    } catch (err) {
      if (err.message === 'Unauthorized') {
        dispatch(loginFail({attempt: 'failure'}));
      }
      console.log(err.response);
    }
  }

  return (
    <div className="body">
      <div className="wrapper">
        <div className="title">Music</div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="text"
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoComplete="off"
            />
            <label>Username</label>
          </div>
          <div className="field">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              name="password"
              required
            />
            <label>Password</label>
          </div>
          <div className="field">
            <input type="submit" value="Login" />
          </div>
          <div className="signup-link">
            <p>
              {' '}
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
