import axios from 'axios';

const baseURL = 'http://localhost:4000/';

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export const getAllSongs = async (sortBy, limit) => {
  try {
    const res = await api.get(`api/song/get?sortBy=${sortBy}&limit=${limit}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const addSong = async data => {
  try {
    const res = await api.post(`api/song/add`, {
      ...data,
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const updateSong = async (songId, data) => {
  try {
    const res = await api.put(`api/song/update/${songId}`, {
      ...data,
    });
    return res;
  } catch (error) {
    return error;
  }
};
