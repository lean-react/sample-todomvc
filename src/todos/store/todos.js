import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import api from '../api/local-backend';

export const loadTodos = createAsyncThunk( 'todos/load',
  () => api.getAll()
);

export const createTodo = createAsyncThunk( 'todos/createTodo',
  ({ title }) => api.create(title)
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

export const syncAllCompletedStates = createAsyncThunk( 'todos/syncAllCompletedStates',
  async ({ completed }, thunkAPI) => {
    // Filter all items needing an update ...
    const todosToUpdate = thunkAPI.getState().todos.items.filter(t => t.completed !== completed);
    // ... and map to update promises
    await Promise.all( todosToUpdate.map(t => api.update(t.id, { completed })));
    // Result of the promises is an array of updated todos - with all completed states set to completed.
    // So I will symplify the payload just to the requested completed state.
    return completed;
  }
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
    },
    [syncAllCompletedStates.fulfilled]: (state, action) => {
      const newCompletedState = action.payload;
      state.items.forEach(t => {t.completed = newCompletedState; });
    }
  }
});

export const todosSelector = s => s.todos.items;

export const allCompletedSelector = createSelector(
  todosSelector, todos => todos.findIndex(t => !t.completed) === -1);

export default todosSlice.reducer;
