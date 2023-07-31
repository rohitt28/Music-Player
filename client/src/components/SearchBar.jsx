import React, {useEffect, useState, useRef} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {InputBase} from '@mui/material';
import {styled, alpha} from '@mui/material/styles';
import {useDispatch, useSelector} from 'react-redux';
import {changeSearch} from '../store/reducers/dataReducer';
import {useLocation} from 'react-router-dom';

function SearchBar() {
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
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const location = useLocation();
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  useEffect(() => {
    focusInput();
  });
  const searchQuery = useSelector(state => state.data.searchQuery);
  const searchData = event => {
    const data = event.target.value;
    console.log(event.target.value);
    dispatch(changeSearch(data));
  };
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  if (location.pathname !== '/song' && location.pathname !== '/artist') {
    return <></>;
  }
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{'aria-label': 'search'}}
        value={searchQuery}
        onInput={searchData}
        inputRef={inputRef}
      />
    </Search>
  );
}

export default SearchBar;
