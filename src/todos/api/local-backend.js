//
// WebStorage Helper
//

function loadTodos() {
  return JSON.parse(localStorage.todos || '[]');
}
function saveTodos(todos) {
  localStorage.todos = JSON.stringify(todos);
}
function generateId() {
  const id = JSON.parse(localStorage.lastId || '0') + 1;
  localStorage.lastId = id;
  return id;
}

//
// Public Backend API
//

async function getAll() {
  return loadTodos();
}

async function create(title) {
  const todos = loadTodos();
  const todo = { id: generateId(), title, completed: false };
  saveTodos([...todos, todo]);
  return todo;
}

async function update(id, changes) {
  const todos = loadTodos();
  const todo = { ...todos.find((t) => t.id === id), ...changes };
  saveTodos(todos.map((t) => (t.id === id ? todo : t)));
  return todo;
}

async function destroy(id) {
  const todos = loadTodos();
  saveTodos(todos.filter((t) => t.id !== id));
  return id;
}

export default {
  getAll,
  create,
  update,
  destroy,
};
