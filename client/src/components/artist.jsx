import {React} from 'react';
import Grid from '@mui/material/Grid';

function Artist(props) {
  var artistdata = props.pageData;
  return (
    <Grid
      id="tmp"
      container
      spacing={2}
      style={{padding: '3% 8%'}}
      className="justify-center">
      {artistdata.length > 0 &&
        artistdata.map(room => (
          <Grid
            item
            key={room['_id']}
            xs={4}
            md={2}
            style={{textAlign: 'center'}}>
            <img
              alt="artist"
              src={room['imageURL']}
              style={{borderRadius: '50%', width: '100%'}}
            />
            {room['name']}
          </Grid>
        ))}
    </Grid>
  );
}

export default Artist;
