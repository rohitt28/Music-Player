import axios from 'axios';

const baseURL = 'http://localhost:4000/';

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export const getAllArtists = async userId => {
  try {
    const res = await api.get(`api/artist/get`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const addArtist = async data => {
  try {
    const res = await api.post(`api/artist/add`, {
      ...data,
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const deleteArtist = async artistId => {
  try {
    const res = api.delete(`api/artist/delete/${artistId}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const updateArtist = async (artistId, data) => {
  try {
    const res = await api.put(`api/artist/update/${artistId}`, {
      ...data,
    });
    return res;
  } catch (error) {
    return error;
  }
};
