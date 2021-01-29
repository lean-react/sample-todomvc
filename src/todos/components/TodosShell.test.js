import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { TodosShell } from './TodosShell';

import store from '../store';
import * as actions from '../store/todos';

// Mock backend (eigentlich nur wichtig, falls XHR o.ä. im Spiel ist)
jest.mock('../api/local-backend');

describe('TodosShell component', () => {

  it('dispatches async createTodo action', () => {

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
