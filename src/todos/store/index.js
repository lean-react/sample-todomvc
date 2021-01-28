
import { configureStore } from '@reduxjs/toolkit';
import todos from './todos';

const store = configureStore({
  reducer: {
    todos
  }
});

export default store;
