import { TodosList } from './TodosList';
import { useDispatch, useSelector } from 'react-redux';
import { allCompletedSelector, hasTodosSelector, syncAllCompletedStates } from '../store/todos';

export function TodosMain() {
  const dispatch = useDispatch();
  const allCompleted = useSelector(allCompletedSelector);
  const hasTodos = useSelector(hasTodosSelector);

  const handleToggleAll = () => {
    dispatch(syncAllCompletedStates({ completed: !allCompleted }));
  };

  if (!hasTodos) {
    return null;
  }

  return (
    <section className='main'>
      <input id='toggle-all' className='toggle-all' type='checkbox'
             checked={allCompleted}
             onChange={handleToggleAll}
      />
      <label htmlFor='toggle-all'>Mark all as complete</label>
      <TodosList />
    </section>
  );
}
