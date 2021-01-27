import { TodosList } from "./TodosList";

export function TodosMain() {
  return (
    <section className="main">
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <TodosList />
    </section>
  );
}
