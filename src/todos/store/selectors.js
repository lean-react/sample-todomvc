import { createSelector } from '@reduxjs/toolkit';

export const getTodos = s => s.todos.items;
export const getVisibility = s => s.visibility.filter;

// Memoized selectors
export const allCompletedSelector = createSelector(
  getTodos, todos => todos.findIndex(t => !t.completed) === -1
);
export const hasTodosSelector = createSelector(
  getTodos, todos => todos.length > 0
);
export const hasCompletedTodosSelector = createSelector(
  getTodos, todos => todos.findIndex(t => t.completed) !== -1
);
export const activeCountSelector = createSelector(
  getTodos, todos => todos.reduce((count, t) => t.completed ? count : count + 1, 0)
);

