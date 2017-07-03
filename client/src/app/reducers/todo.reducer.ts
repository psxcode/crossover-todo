import { Action } from '@ngrx/store';

import { TodoActions } from '../actions';
import { ITodoState } from '../state';
import { TODO_STATUS_COMPLETE, ITodo } from '../models';
import { findTodoById, spliceTodos, isTodoComplete, isTodoIncomplete } from '../utils';

const initialState: ITodoState = {
  complete: [],
  incomplete: [],
  editing: null
};

export function TodoReducer(state = initialState, action: Action): ITodoState {
  switch (action.type) {

    case TodoActions.SET: {
      const todos: ITodo[] = action.payload.todos;
      return Object.assign({}, state, {
        complete: todos.filter(isTodoComplete),
        incomplete: todos.filter(isTodoIncomplete)
      });
    }

    case TodoActions.ADD_SUCCESS: {
      const todo: ITodo = action.payload.todo,
        isComplete: boolean = todo.status === TODO_STATUS_COMPLETE,
        added = isComplete ? {complete: [...state.complete, todo]} :
          {incomplete: [...state.incomplete, todo]};

      return Object.assign({}, state, added);
    }

    case TodoActions.REMOVE_SUCCESS: {
      const id: string = action.payload.id,
        {complete, incomplete}: ITodoState = state,
        indexComplete: number = findTodoById(complete, id),
        indexIncomplete: number = indexComplete < 0 ? findTodoById(incomplete, id) : -1;

      if (indexIncomplete < 0 && indexComplete < 0) {
        return state;
      }

      if (indexComplete >= 0 && indexIncomplete >= 0) {
        return state;
      }

      const isComplete: boolean = indexComplete >= 0;
      const modified = {
        complete: !isComplete ? complete : spliceTodos(complete, indexComplete),
        incomplete: isComplete ? incomplete : spliceTodos(incomplete, indexIncomplete)
      };

      return Object.assign({}, state, modified);
    }

    case TodoActions.EDIT_SUCCESS: {
      const todo: ITodo = action.payload.todo,
        id: string = todo._id,
        {complete, incomplete}: ITodoState = state,
        indexComplete: number = findTodoById(complete, id),
        indexIncomplete: number = indexComplete < 0 ? findTodoById(incomplete, id) : -1;

      if (indexIncomplete < 0 && indexComplete < 0) {
        return state;
      }

      if (indexComplete >= 0 && indexIncomplete >= 0) {
        return state;
      }

      const wasComplete: boolean = indexComplete >= 0,
        isNowComplete: boolean = todo.status === TODO_STATUS_COMPLETE,
        modified = {
          complete: wasComplete ?
            /* was complete */
            isNowComplete ?
              /* and stays complete */
              spliceTodos(complete, indexComplete, todo) :
              /* moved to incomplete */
              spliceTodos(complete, indexComplete) :
            /* was incomplete */
            isNowComplete ?
              /* moved to complete */
              [...complete, todo] :
              /* and stays complete */
              complete,
          incomplete: !wasComplete ?
            /* was incomplete */
            !isNowComplete ?
              /* and stays incomplete */
              spliceTodos(incomplete, indexIncomplete, todo) :
              /* moved to complete */
              spliceTodos(incomplete, indexIncomplete) :
            /* was complete */
            !isNowComplete ?
              /* moved to incomplete */
              [...incomplete, todo] :
              /* and stays complete */
              incomplete
        };

      return Object.assign({}, state, modified);
    }

    case TodoActions.CLEAR: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
