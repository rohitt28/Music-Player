import {createSlice} from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    searchQuery: '',
  },
  reducers: {
    changeSearch: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {changeSearch} = dataSlice.actions;
export default dataSlice.reducer;
