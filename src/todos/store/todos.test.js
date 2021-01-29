import { configureStore } from '@reduxjs/toolkit';
import api from '../api/local-backend';
import todos, { createTodo, loadTodos } from './todos';

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

  test('createTodo fulfilled adds created todo', () => {
    const initialState = { items: [] };
    const todo = { id: 17, title: 'Extra Reducer testing', completed: true };
    const action = { type: createTodo.fulfilled.type, payload: todo };
    const state = todos(initialState, action);
    expect(state.items[0]).toBe(todo);
  });

  test('loadTodos action makes an api call', () => {
    store.dispatch(loadTodos());
    expect(api.getAll).toHaveBeenCalled();
  });

  test('loadTodos fulfilled sets the state items', () => {
    const initialState = { items: [] };
    const items = [1,2,3];
    const action = { type: loadTodos.fulfilled.type, payload: items };
    const state = todos(initialState, action);
    expect(state.items).toBe(items);
  });
});
