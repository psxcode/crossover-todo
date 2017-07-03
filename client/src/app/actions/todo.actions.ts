import { Action } from '@ngrx/store';
import { ITodo } from '../models';

export class TodoActions {

  static SET = '[Todo] Set';

  static set(todos: ITodo[]): Action {
    return {
      type: TodoActions.SET,
      payload: {todos}
    };
  }

  static ADD = '[Todo] Add';

  static add(todo: ITodo): Action {
    return {
      type: TodoActions.ADD,
      payload: {todo}
    };
  }

  static REMOVE = '[Todo] Remove';

  static remove(id: string): Action {
    return {
      type: TodoActions.REMOVE,
      payload: {id}
    };
  }

  static EDIT = '[Todo] Edit';

  static edit(todo: ITodo): Action {
    return {
      type: TodoActions.EDIT,
      payload: {todo}
    };
  }

  static REMOVE_ALL = '[Todo] Remove All';

  static removeAll(): Action {
    return {
      type: TodoActions.REMOVE_ALL
    };
  }
}
