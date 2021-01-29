import { useSelector } from 'react-redux';
import { TodosItem } from './TodosItem';

export function TodosList() {
  const todos = useSelector(s => s.todos.items);

  return (
    <ul className="todo-list">
      { todos.map(t => (<TodosItem key={t.id} todo={t} />))}
    </ul>
  );
}
