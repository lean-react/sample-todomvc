import { useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { destroyTodo, toggleTodoCompletedState, updateTodoTitle } from '../store';

export function TodosItem({ todo }) {

  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  function beginEdit() {
    setEditMode(true);
  }

  function cancelEdit() {
    setEditMode(false);
    setEditTitle(todo.title);
  }

  function commitEdit() {
    if (editMode) {
      const title = editTitle.trim();
      if (title) {
        dispatch(updateTodoTitle({id: todo.id, title}));
      } else {
        handleDestroyTodo();
      }
      setEditMode(false);
    }
  }

  function toggleCompletedState() {
    dispatch(toggleTodoCompletedState({id: todo.id}));
  }

  function handleDestroyTodo() {
    dispatch(destroyTodo({ id: todo.id }));
  }

  function handleBlur() {
    commitEdit();
  }

  function handleKey(ev) {
    if (ev.which === 13) {
      commitEdit();
    } else if (ev.which === 27) {
      cancelEdit();
    }
  }

  const liClasses = classNames({
    completed: todo.completed,
    editing: editMode
  })

  return (
    <li className={liClasses}>
      { editMode ?
        <input className="edit"
               autoFocus={true}
               value={editTitle}
               onChange={(ev) => setEditTitle(ev.target.value)}
               onBlur={handleBlur}
               onKeyUp={handleKey}
        />
        :
        <div className="view">
          <input className="toggle" type="checkbox" checked={todo.completed} onChange={toggleCompletedState} />
          <label onDoubleClick={beginEdit}>{todo.title}</label>
          <button onClick={handleDestroyTodo} className="destroy"></button>
        </div>
      }
    </li>
  );
}
