import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodosInput } from './TodosInput';

describe('TodosInput component', () => {
  test('fires a callback on entering a new todo title', () => {
    const title = 'Testing a callback property';
    const handleOnCreateTodo = jest.fn();
    render(<TodosInput onCreateTodo={handleOnCreateTodo} />);

    const inputFld = screen.getByRole('textbox');
    userEvent.type(inputFld, `${title}{enter}`);

    expect(handleOnCreateTodo).toHaveBeenCalled();
    expect(handleOnCreateTodo).toHaveBeenCalledWith(title);
  });

  test('trims the entered todo title', () => {
    const title = '  Testing a callback property  ';
    const handleOnCreateTodo = jest.fn();
    render(<TodosInput onCreateTodo={handleOnCreateTodo} />);

    const inputFld = screen.getByRole('textbox');
    userEvent.type(inputFld, `${title}{enter}`);

    expect(handleOnCreateTodo).toHaveBeenCalled();
    expect(handleOnCreateTodo).toHaveBeenCalledWith(title.trim());
  });

  test('does not accept an empty title', () => {
    const title = '';
    const handleOnCreateTodo = jest.fn();
    render(<TodosInput onCreateTodo={handleOnCreateTodo} />);

    const inputFld = screen.getByRole('textbox');
    userEvent.type(inputFld, `${title}{enter}`);

    expect(handleOnCreateTodo).not.toHaveBeenCalled();
  });
});
