import { IAppState, ITodoState } from '../state';
import { ITodo, TODO_STATUS_COMPLETE, TODO_STATUS_NOT_COMPLETE } from '../models';

export function toComplete(state: IAppState): ITodo[] {
  return state.todo.complete;
}

export function toIncomplete(state: IAppState): ITodo[] {
  return state.todo.incomplete;
}

export function spliceTodos(todos: ITodo[], index: number, ...insertTodos: ITodo[]): ITodo[] {
  return [...todos.slice(0, index), ...insertTodos, ...todos.slice(index + 1)];
}

export function findTodoById(todos: ITodo[], id: string): number {
  console.log(todos);
  return todos.findIndex((todo: ITodo) => todo._id === id);
}

export function isTodoComplete(todo: ITodo): boolean {
  return todo.status === TODO_STATUS_COMPLETE;
}

export function isTodoIncomplete(todo: ITodo): boolean {
  return todo.status === TODO_STATUS_NOT_COMPLETE;
}
