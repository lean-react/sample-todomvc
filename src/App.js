import { TodosShell } from './todos/components/TodosShell';

function App() {
  return (
    <>
      <TodosShell />
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>
          Created by <a href="https://lean-stack.de">Michael Alt</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </>
  );
}

export default App;
