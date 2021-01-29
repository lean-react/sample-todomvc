import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { TodosItem } from './TodosItem';
import userEvent from '@testing-library/user-event';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../store/todos';

describe('TodosItem component', () => {

  let todo;
  let store;

  beforeEach(() => {
    todo = { id: 42, title: 'Simple Tests at component level', completed: true };
    const mockStore = configureStore([thunk]);
    store = mockStore({ todos: { items: [] }});
  });

  describe('view mode', () => {

    test('displays the todo title', () => {
      render(<Provider store={store}><TodosItem todo={todo}></TodosItem></Provider>);
      expect(screen.getByText(todo.title)).toBeInTheDocument();
    });

    test('displays the completed state', () => {
      const { rerender } = render(<Provider store={store}><TodosItem todo={todo}></TodosItem></Provider>);
      expect(screen.getByRole('checkbox', {checked: true})).toBeInTheDocument();

      todo = { ...todo, completed: !todo.completed };
      rerender(<Provider store={store}><TodosItem todo={todo}></TodosItem></Provider>);
      expect(screen.getByRole('checkbox', {checked: false})).toBeInTheDocument();
    });

    test('renders the completed class at the li-item', () => {
      const { rerender } = render(<Provider store={store}><TodosItem todo={todo}></TodosItem></Provider>);
      expect(screen.getByRole('listitem')).toHaveClass('completed');

      todo = { ...todo, completed: !todo.completed };
      rerender(<Provider store={store}><TodosItem todo={todo}></TodosItem></Provider>);
      expect(screen.getByRole('listitem')).not.toHaveClass('completed');
    });

  });

  describe('edit mode', () => {

    test('is entered with dblclick at label', () => {
      render(<Provider store={store}><TodosItem todo={todo}></TodosItem></Provider>);
      fireEvent.dblClick(screen.getByText(todo.title));
      const editFld = screen.getByRole('textbox');
      expect(editFld).toBeInTheDocument();
    });

    test('shows initially original title', () => {
      render(<Provider store={store}><TodosItem todo={todo}></TodosItem></Provider>);
      fireEvent.dblClick(screen.getByText(todo.title));
      const editFld = screen.getByRole('textbox');
      expect(editFld.value).toBe(todo.title);
    });

    test('trims the entered title', async () => {
      jest.spyOn(actions, 'updateTodoTitle');

      render(<Provider store={store}><TodosItem todo={todo}></TodosItem></Provider>);
      fireEvent.dblClick(screen.getByText(todo.title));
      userEvent.type(screen.getByRole('textbox'), '{selectall}{backspace}   Trimmed  {enter}');

      expect(actions.updateTodoTitle).toHaveBeenCalledWith({ id: 42, title: 'Trimmed' });
    });
  });
});
