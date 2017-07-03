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

  static add(title: string, desc: string): Action {
    return {
      type: TodoActions.ADD,
      payload: {title, desc}
    };
  }

  static ADD_SUCCESS = '[Todo] Add Success';

  static addSuccess(todo: ITodo): Action {
    return {
      type: TodoActions.ADD_SUCCESS,
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

  static REMOVE_SUCCESS = '[Todo] Remove Success';

  static removeSuccess(id: string): Action {
    return {
      type: TodoActions.REMOVE_SUCCESS,
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

  static EDIT_SUCCESS = '[Todo] Edit Success';

  static editSuccess(todo: ITodo): Action {
    return {
      type: TodoActions.EDIT_SUCCESS,
      payload: {todo}
    };
  }

  static CLEAR = '[Todo] Remove All';

  static clear(): Action {
    return {
      type: TodoActions.CLEAR
    };
  }

  static START_INLINE_EDIT = '[Todo] Start Inline Edit';

  static startInlineEdit(): Action {
    return {
      type: TodoActions.CLEAR
    };
  }
}
