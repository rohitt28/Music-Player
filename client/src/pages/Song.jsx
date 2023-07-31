import {React, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getAllSongs} from '../api/song';
import Song from '../components/song'

function Songs() {
  const searchQuery = useSelector(state => state.data.searchQuery);
  console.log(searchQuery);
  const [data, setData] = useState([]);
  const [filteredData, setFiltererdData] = useState([]);

  useEffect(() => {
    getAllSongs().then(res => {
      setData(res.data);
    });
  }, []);
  useEffect(() => {
    const tmpdata = [];
    data.forEach(val => {
      if (val.name.includes(searchQuery)) {
        tmpdata.push(val);
      }
    });
    setFiltererdData(tmpdata);
  }, [data, searchQuery]);
  console.log(filteredData);
  return <Song pageData={filteredData} />;
}

export default Songs;
