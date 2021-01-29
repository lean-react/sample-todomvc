import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../api/local-backend';

export const loadTodos = createAsyncThunk( 'todos/load',
  () => api.getAll()
);

export const createTodo = createAsyncThunk( 'todos/createTodo',
  (title) => api.create(title)
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: []
  },
  reducers: {
  },
  extraReducers: {
    [loadTodos.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
    [createTodo.fulfilled]: (state, action) => {
      state.items.push(action.payload);
    }
  }
});

export default todosSlice.reducer;
