
import { configureStore } from '@reduxjs/toolkit';
import todos from './todos';
import visibility from './visibility';

const store = configureStore({
  reducer: {
    todos,
    visibility
  }
});

export * from './selectors';

export default store;
