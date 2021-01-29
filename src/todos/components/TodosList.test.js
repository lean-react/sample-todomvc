import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { TodosList } from './TodosList';

import configureStore from 'redux-mock-store';


describe('TodosList component', () => {
  test('renders zero todos with empty state', () => {
    const store = configureStore([])({ todos: { items: [] }});

    render(
      <Provider  store={store}>
        <TodosList />
      </Provider>
    );

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  test('renders x todos with x items in state', () => {
    const store = configureStore([])({ todos: { items: [
      { id: 1, title: 'Todo 1', completed: true },
      { id: 2, title: 'Todo 2', completed: false },
    ] }});

    render(
      <Provider  store={store}>
        <TodosList />
      </Provider>
    );

    expect(screen.queryAllByRole('listitem').length).toBe(2);
  });
});
