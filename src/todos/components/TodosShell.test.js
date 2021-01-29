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

  it('dispatches async createTodo action', () => {

    const store = configureStore([thunk])({ todos: { items: [] }});

    jest.spyOn(actions, 'createTodo');

    render(
      <Provider store={store}>
        <TodosShell />
      </Provider>
    );

    const header = screen.getByRole('banner');
    const inputFld = within(header).getByRole('textbox');

    userEvent.type(inputFld, 'Testing async dispatch{enter}');

    expect(actions.createTodo).toHaveBeenCalled();

  });
});
