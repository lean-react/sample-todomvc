import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createTodo, loadTodos } from '../store/todos';
import { TodosActionbar } from './TodosActionbar';
import { TodosInput } from './TodosInput';
import { TodosMain } from './TodosMain';

export function TodosShell() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  function handleOnCreateTodo(title) {
    dispatch(createTodo(title));
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodosInput onCreateTodo={handleOnCreateTodo} />
      </header>
      <TodosMain />
      <TodosActionbar />
    </section>
  );
}
