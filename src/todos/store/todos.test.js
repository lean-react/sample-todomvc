import { configureStore } from '@reduxjs/toolkit';
import api from '../api/local-backend';
import todos, { createTodo } from './todos';

// Mock backend module
jest.mock('../api/local-backend');

describe('Todos Slice', () => {

  let store;
  beforeEach(() => {
    store = configureStore({ reducer: { todos } })
  });

  test('createTodo action makes an api call', () => {
    const title = 'Test an async thunk action';
    store.dispatch(createTodo(title));
    expect(api.create).toHaveBeenCalledWith(title);
  });
});
