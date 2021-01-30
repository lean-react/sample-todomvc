import { TodosItem } from './TodosItem';
import { useFilteredTodos } from '../store';

export function TodosList() {
  const todos = useFilteredTodos();

  return (
    <ul className="todo-list">
      { todos.map(t => (<TodosItem key={t.id} todo={t} />))}
    </ul>
  );
}
