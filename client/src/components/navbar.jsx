import {React, useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import {styled, alpha} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Grid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import Song from './song';
import Artist from './artist';
import {useSelector} from 'react-redux';

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const drawerWidth = 240;
const navItems = [
  ['Home', '/'],
  ['All Songs', '/song'],
  ['Artists', '/artist'],
];
var settings = ['Account Details', 'Liked Songs', 'Dashboard', 'Logout'];

function Navbar(props) {
  const {window} = props;
  const User = useSelector(state => state.auth.user);
  const isAdmin = useSelector(state => state.auth.isAdmin);
  if (!isAdmin) {
    settings = ['Account Details', 'Liked Songs', 'Logout'];
  }
  const ActivePage = props.activePage;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pagedata, setpagedata] = useState('');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };
  const navigate = useNavigate();
  const handleCloseUserMenu = page => {
    setAnchorElUser(null);
    if (page) {
      if (page['setting'] === 'Logout') {
        navigate('/login', {
          replace: true,
        });
      }
      if (page['setting'] === 'Dashboard') {
        navigate('/admin', {
          replace: true,
        });
      }
      if (page['setting'] === 'Account Details') {
        navigate('/user', {
          replace: false,
        });
      }
      if (page['setting'] === 'Liked Songs') {
        navigate('/liked', {
          replace: false,
        });
      }
    }
  };
  var check = 'name';

  const searchdata = event => {
    var str = event.target.value;
    if (str) {
      let temp;
      temp = pagedata.filter(item => {
        return item[check].toLowerCase().includes(str.toLowerCase());
      });
      setpagedata(temp);
    } else {
      axios
        .get('http://localhost:4000/api/' + data + '/get/')
        .then(res => {
          setpagedata(res.data.data);
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    }
  };

  var tmpbutton = (
    <>
      <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
        <AccountCircleIcon
          sx={{fontSize: 43}}
          style={{color: 'white'}}></AccountCircleIcon>
      </IconButton>
      <Menu
        sx={{mt: '45px'}}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}>
        {settings.map(setting => (
          <MenuItem key={setting} onClick={e => handleCloseUserMenu({setting})}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
  if (User === 'null') {
    tmpbutton = (
      <Link to="/login">
        <Button sx={{color: '#fff'}}>Login</Button>
      </Link>
    );
  }
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
      <Typography variant="h6" sx={{my: 2}}>
        Muscily
      </Typography>
      <Divider />
      <List>
        {navItems.map(([item, item1]) => (
          <ListItem key={item} disablePadding>
            <Link to={item1}>
              <ListItemButton sx={{textAlign: 'center'}}>
                <ListItemText primary={item} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  var Body;
  var data = 'song';
  if (ActivePage === 'artists') {
    data = 'artist';
  }
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/' + data + '/get/')
      .then(res => {
        setpagedata(res.data.data);
      })
      .catch(err => {
        console.log(err.response.data.message);
      });
  }, []);
  if (ActivePage === 'songs') {
    Body = <Song pageData={pagedata} user={User} />;
  } else if (ActivePage === 'artists') {
    Body = <Artist pageData={pagedata} />;
  }
  return (
    <>
      <Box sx={{display: 'flex', height: '10vh'}}>
        <AppBar component="nav">
          <Toolbar>
            <Grid container spacing={1}>
              <Grid item xs={1}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{mr: 2, display: {sm: 'none'}}}>
                  <MenuIcon />
                </IconButton>
                <Avatar
                  variant={'rounded'}
                  alt="Logo"
                  src={require('../logo.png')}
                  style={{
                    height: '100%',
                  }}
                  sx={{display: {xs: 'none', sm: 'block'}}}
                />
              </Grid>
              <Grid item md={3}>
                <Box
                  sx={{display: {xs: 'none', sm: 'block', alignItems: 'left'}}}>
                  {navItems.map(([item, item1]) => (
                    <Link to={item1}>
                      <Button key={item} sx={{color: '#fff'}}>
                        {item}
                      </Button>
                    </Link>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={7} md={6}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{'aria-label': 'search'}}
                    onInput={searchdata}
                  />
                </Search>
              </Grid>
              <Grid item xs={2}>
                <Box
                  sx={{flexGrow: 0}}
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="flex-end">
                  {tmpbutton}
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: {xs: 'block', sm: 'none'},
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}>
            {drawer}
          </Drawer>
        </Box>
      </Box>
      <br />
      {Body}
    </>
  );
}

export default Navbar;
