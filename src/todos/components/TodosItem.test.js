import { fireEvent, render, screen } from '@testing-library/react';
import { TodosItem } from './TodosItem';

describe('TodosItem component', () => {

  let todo;

  beforeEach(() => {
    todo = { id: 42, title: 'Simple Tests at component level', completed: true };
  });

  describe('view mode', () => {

    test('displays the todo title', () => {
      render(<TodosItem todo={todo}></TodosItem>);
      expect(screen.getByText(todo.title)).toBeInTheDocument();
    });

    test('displays the completed state', () => {
      const { rerender } = render(<TodosItem todo={todo}></TodosItem>);
      expect(screen.getByRole('checkbox', {checked: true})).toBeInTheDocument();

      todo = { ...todo, completed: !todo.completed };
      rerender(<TodosItem todo={todo}></TodosItem>);
      expect(screen.getByRole('checkbox', {checked: false})).toBeInTheDocument();
    });

    test('renders the completed class at the li-item', () => {
      const { rerender } = render(<TodosItem todo={todo}></TodosItem>);
      expect(screen.getByRole('listitem')).toHaveClass('completed');

      todo = { ...todo, completed: !todo.completed };
      rerender(<TodosItem todo={todo}></TodosItem>);
      expect(screen.getByRole('listitem')).not.toHaveClass('completed');
    });

  });

  describe('edit mode', () => {

    test('is entered with dblclick at label', () => {
      render(<TodosItem todo={todo}></TodosItem>);
      fireEvent.dblClick(screen.getByText(todo.title));
      const editFld = screen.getByRole('textbox');
      expect(editFld).toBeInTheDocument();
    });

    test('shows initially original title', () => {
      render(<TodosItem todo={todo}></TodosItem>);
      fireEvent.dblClick(screen.getByText(todo.title));
      const editFld = screen.getByRole('textbox');
      expect(editFld.value).toBe(todo.title);
    });
  });
});
