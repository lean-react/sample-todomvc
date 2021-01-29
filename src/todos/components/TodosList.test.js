import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { TodosList } from './TodosList';
import store from '../store';

describe('TodosList component', () => {
  test('renders zero todos with empty state', () => {
    render(
      <Provider  store={store}>
        <TodosList />
      </Provider>
    );

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
