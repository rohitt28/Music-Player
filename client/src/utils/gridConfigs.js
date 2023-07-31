import {Button} from '@mui/material';
import {Delete, Edit} from '@mui/icons-material';

export const getColumns = (change, del) => {
  const columns = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'name', headerName: 'Name', width: 130},
    {
      field: 'imageURL',
      headerName: 'Image',
      width: 70,
      renderCell: params => <img style={{width: '100%'}} src={params.value} />,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 130,
      renderCell: params => (
        <>
          <Button onClick={e => change(params.value)}>
            <Edit />
          </Button>
          <Button onClick={e => del(params.value)}>
            <Delete />
          </Button>
        </>
      ),
    },
  ];
  return columns;
};
