import { createSlice } from '@reduxjs/toolkit';
import { Filter } from '../model/filter';

const visibilitySlice = createSlice({
  name: 'visibility',
  initialState: {
    filter: Filter.all
  },
  reducers: {
    setVisibility: (state, action) => { state.filter = action.payload; }
  }
});

export const { setVisibility } = visibilitySlice.actions;
export default visibilitySlice.reducer;
