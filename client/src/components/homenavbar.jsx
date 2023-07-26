import {React, useEffect, useState} from 'react';
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
import Grid from '@mui/material/Grid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useSelector} from 'react-redux';

const drawerWidth = 240;
const navItems = [
  ['Home', '/'],
  ['All Songs', '/song'],
  ['Artists', '/artist'],
];

function Homenavbar(props) {
  const {window} = props;
  const [settings, setSettings] = useState([
    'Account Details',
    'Liked Songs',
    'Dashboard',
    'Logout',
  ]);

  const User = useSelector(state => state.auth.user);
  const isAdmin = useSelector(state => state.auth.isAdmin);
  console.log(User, isAdmin);
  useEffect(() => {
    if (!isAdmin) {
      setSettings(['Account Details', 'Liked Songs', 'Logout']);
    } else {
      setSettings(['Account Details', 'Liked Songs', 'Dashboard', 'Logout']);
    }
  }, [isAdmin]);
  const [mobileOpen, setMobileOpen] = useState(false);

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
              <Grid item md={9}>
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
    </>
  );
}

export default Homenavbar;
