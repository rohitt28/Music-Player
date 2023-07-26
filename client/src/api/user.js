import axios from 'axios';

const baseURL = 'http://localhost:4000/';

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export const getCurrentUser = async () => {
  try {
    const res = await api.get(`api/user/getCurrent/`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const loginUser = async data => {
  console.log({...data});
  try {
    const res = await api.put('api/user/login', {
      ...data,
    });
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Unauthorized');
    }
    return error;
  }
};

export const logoutUser = async data => {
  console.log({...data});
  try {
    const res = await api.put('api/user/logout', {
      ...data,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const addUser = async data => {
  try {
    const res = await api.post(`api/user/add`, {
      ...data,
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const getUserById = async userId => {
  try {
    const res = await api.get(`api/user/get/${userId}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await api.get(`api/user/get`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const updateUser = async (userId, data) => {
  try {
    const res = api.put(`api/user/update/${userId}`, {
      ...data,
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async userId => {
  try {
    const res = api.delete(`api/user/delete/${userId}`);
    return res;
  } catch (error) {
    return error;
  }
};
