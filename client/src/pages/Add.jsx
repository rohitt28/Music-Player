import React from 'react';
import AddArtist from '../components/AddArtist';
import AddSong from '../components/AddSong';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

function Add() {
  const isAdmin = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  if (!isAdmin) {
    navigate('/', {replace: true});
  }
  var pagedata = <AddArtist />;
  if (window.localStorage.getItem('add') === 'song') {
    pagedata = <AddSong />;
  }
  return (
    <>
      {pagedata}
    </>
  );
}

export default Add;
