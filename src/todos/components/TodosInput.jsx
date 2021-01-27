export function TodosInput({onCreateTodo}) {

  function handleEnter(ev) {
    if (ev.which === 13) {
      const title = ev.target.value.trim();
      if (title) {
        onCreateTodo(title);
      }
      ev.target.value = '';
    }
  }

  return (
    <input
      onKeyUp={handleEnter}
      className="new-todo"
      placeholder="What needs to be done?"
      autoFocus
    />
  );
}
