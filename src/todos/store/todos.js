import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../api/local-backend';

export const loadTodos = createAsyncThunk( 'todos/load',
  () => api.getAll()
);

export const createTodo = createAsyncThunk( 'todos/createTodo',
  (title) => api.create(title)
);

export const toggleTodoCompletedState = createAsyncThunk( 'todos/setCompleted',
  ({ id }, thunkAPI) => {
    // getState gives root state
    const todo = thunkAPI.getState().todos.items.find(t => t.id === id);
    return api.update(id, { completed: !todo.completed });
  }
);

export const updateTodoTitle = createAsyncThunk( 'todos/updateTitle',
  ({ id, title }) => api.update(id, {title})
);

export const destroyTodo = createAsyncThunk( 'todos/destroyTodo',
  ({ id }) => api.destroy(id)
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
    },
    [toggleTodoCompletedState.fulfilled]: (state, action) => {
      const updatedTodo = action.payload;
      state.items = state.items.map(t => t.id === updatedTodo.id ? updatedTodo : t);
    },
    [updateTodoTitle.fulfilled]: (state, action) => {
      const updatedTodo = action.payload;
      state.items = state.items.map(t => t.id === updatedTodo.id ? updatedTodo : t);
    },
    [destroyTodo.fulfilled]: (state, action) => {
      const deletedId = action.payload;
      state.items = state.items.filter(t => t.id !== deletedId);
    }
  }
});

export default todosSlice.reducer;
