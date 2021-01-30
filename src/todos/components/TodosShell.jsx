import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createTodo, loadTodos, setVisibility } from '../store';
import { TodosActionbar } from './TodosActionbar';
import { TodosInput } from './TodosInput';
import { TodosMain } from './TodosMain';
import { Filter } from '../model/filter';

export function TodosShell() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  function handleOnCreateTodo(title) {
    dispatch(createTodo({title}));
  }

  // Routing
  useEffect(() => {

    const hashListener =  () => {
      switch (window.location.hash) {
        case '#/active':
          dispatch(setVisibility(Filter.active));
          break;
        case '#/completed':
          dispatch(setVisibility(Filter.completed));
          break;
        default:
          window.location.hash = '#/';
          dispatch(setVisibility(Filter.all));
          break;
      }
    }

    // Initial routing
    hashListener();

    window.addEventListener('hashchange', hashListener);
    return () => { window.removeEventListener('hashchange', hashListener) };

  }, [dispatch]);

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
