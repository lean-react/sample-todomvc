import { TodosList } from './TodosList';
import { useDispatch, useSelector } from 'react-redux';
import { syncAllCompletedStates } from '../store/todos';

export function TodosMain() {
  const dispatch = useDispatch();
  const allCompleted = useSelector(s => s.todos.items.findIndex(t => !t.completed) === -1);

  function handleToggleAll() {
    dispatch(syncAllCompletedStates({completed: !allCompleted}));
  }

  return (
    <section className="main">
      <input id="toggle-all" className="toggle-all" type="checkbox"
             checked={allCompleted}
             onChange={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <TodosList />
    </section>
  );
}
