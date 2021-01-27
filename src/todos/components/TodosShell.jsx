import { TodosActionbar } from './TodosActionbar';
import { TodosInput } from './TodosInput';
import { TodosMain } from './TodosMain';

export function TodosShell() {
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodosInput />
      </header>
      <TodosMain />
      <TodosActionbar />
    </section>
  );
}
