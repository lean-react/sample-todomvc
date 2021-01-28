import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../api/local-backend';

export const createTodo = createAsyncThunk( 'todos/createTodo',
  (title) => api.create(title)
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: []
  },
  reducers: {},
  extraReducers: {}
});

export default todosSlice.reducer;
