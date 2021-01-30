import { useDispatch, useSelector } from 'react-redux';
import {
  activeCountSelector,
  destroyAllCompletedTodos,
  hasCompletedTodosSelector,
  hasTodosSelector
} from '../store/todos';

export function TodosActionbar() {
  const hasTodos = useSelector(hasTodosSelector);
  const hasCompletedTodos = useSelector(hasCompletedTodosSelector);
  const activeCount = useSelector(activeCountSelector);
  const dispatch = useDispatch();

  function handleClearCompleted() {
    dispatch(destroyAllCompletedTodos());
  }

  if (!hasTodos) {
    return null;
  }

  return (
    <footer className="footer">
      {/* <!-- This should be `0 items left` by default --> */}
      <span className="todo-count">
        <strong>{activeCount}</strong> {activeCount === 1 ? 'item' : 'items'} left
      </span>
      {/* <!-- Remove this if you don't implement routing --> */}
      <ul className="filters">
        <li>
          <a className="selected" href="#/">
            All
          </a>
        </li>
        <li>
          <a href="#/active">Active</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>
      { hasCompletedTodos &&
        <button onClick={handleClearCompleted} className="clear-completed">Clear completed</button> }

    </footer>
  );
}
