import {React, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Menu,
  Avatar,
  MenuItem,
  Grid,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useSelector, useDispatch} from 'react-redux';
import {logoutUser} from '../api/user';
import SearchBar from './SearchBar';
import {navItems, userSettings, adminSettings} from '../utils/navigation';
const drawerWidth = 240;

function Navbar(props) {
  const {window} = props;
  const [settings, setSettings] = useState(userSettings);
  const navigate = useNavigate();

  const User = useSelector(state => state.auth.user);
  const isAdmin = useSelector(state => state.auth.isAdmin);
  useEffect(() => {
    if (!isAdmin) {
      setSettings(userSettings);
    } else {
      setSettings(adminSettings);
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
  const handleCloseUserMenu = (name, path) => {
    setAnchorElUser(null);
    if (name) {
      if (name === 'Logout') {
        logoutUser().then(res => {
          console.log(res);
        });
      }
      navigate(path, {replace: true});
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
          <MenuItem
            key={setting.name}
            onClick={e => handleCloseUserMenu(setting.name, setting.path)}>
            <Typography textAlign="center">{setting.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
  if (!User) {
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
        {navItems.map(({name, path}) => (
          <ListItem key={(name, path)} disablePadding>
            <Link to={path}>
              <ListItemButton sx={{textAlign: 'center'}}>
                <ListItemText primary={name} />
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
              <Grid item md={3}>
                <Box
                  sx={{display: {xs: 'none', sm: 'block', alignItems: 'left'}}}>
                  {navItems.map(({name, path}) => (
                    <Link to={path}>
                      <Button key={(name, path)} sx={{color: '#fff'}}>
                        <Typography color={'white'} fontSize={'1em'}>
                          {name}
                        </Typography>
                      </Button>
                    </Link>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={7} md={6}>
                <SearchBar />
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

export default Navbar;
