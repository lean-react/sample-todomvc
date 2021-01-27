import { render, screen } from '@testing-library/react';
import App from './App';

test('renders todos heading', () => {
  render(<App />);
  const appHeading = screen.getByRole('heading', { name: /todos/i });
  expect(appHeading).toBeInTheDocument();
});
