import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { TodosShell } from './TodosShell';

// Notwendig, weil ich das Backend mocke, also keine reellen Todos erzeugt werden
// Alternative Lösungen:
// 1. Testen mit dem original Store und dem reellen Backend (geht, weil Backend nur localStorage)
// 2. Testen mit dem original Store und Backend stubben

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../store/todos';

// Mock backend (eigentlich nur wichtig, falls XHR o.ä. im Spiel ist)
// jest.mock('../api/local-backend');

describe('TodosShell component', () => {

  let store;

  beforeEach(() => {
    store = configureStore([thunk])({ todos: { items: [] }});
  });

  it('dispatches async createTodo action', () => {

    jest.spyOn(actions, 'createTodo');

    render(
      <Provider store={store}>
        <TodosShell />
      </Provider>
    );

    const header = screen.getByRole('banner');
    const inputFld = within(header).getByRole('textbox');

    const title = 'Testing async dispatch';
    userEvent.type(inputFld, `${title}{enter}`);

    expect(actions.createTodo).toHaveBeenCalled();
    expect(actions.createTodo).toHaveBeenCalledWith({title});
  });

  it('loads initially the todos from backend', () => {

    jest.spyOn(actions, 'loadTodos');

    render(
      <Provider store={store}>
        <TodosShell />
      </Provider>
    );

    expect(actions.loadTodos).toHaveBeenCalled();
  });
});
