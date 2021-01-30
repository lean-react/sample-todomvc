import { useSelector } from 'react-redux';
import { Filter } from '../model/filter';

export function useFilteredTodos() {
  const todos = useSelector(s => {
    switch (s.visibility.filter) {
      case Filter.active: return s.todos.items.filter(t => !t.completed);
      case Filter.completed: return s.todos.items.filter(t => t.completed);
      default: return s.todos.items;
    }
  });
  return todos;
}
