import { useSelector } from 'react-redux';
import { TodosItem } from './TodosItem';
import { Filter } from '../model/filter';

export function TodosList() {
  const todos = useSelector(s => {
    switch (s.visibility.filter) {
      case Filter.active: return s.todos.items.filter(t => !t.completed);
      case Filter.completed: return s.todos.items.filter(t => t.completed);
      default: return s.todos.items;
    }
  });

  return (
    <ul className="todo-list">
      { todos.map(t => (<TodosItem key={t.id} todo={t} />))}
    </ul>
  );
}
