import {React, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getAllArtists} from '../api/artist';
import Artist from '../components/artist';

function Artists() {
  const searchQuery = useSelector(state => state.data.searchQuery);
  console.log(searchQuery);
  const [data, setData] = useState([]);
  const [filteredData, setFiltererdData] = useState([]);

  useEffect(() => {
    getAllArtists().then(res => {
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
  return <Artist pageData={filteredData} />;
}

export default Artists;
