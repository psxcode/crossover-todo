import { Action } from '@ngrx/store';
import { ITodo } from '../models';

export class DragActions {

  static START_DRAG = '[Drag] Start Drag';

  static startDrag(id: string, scope: string): Action {
    return {
      type: DragActions.START_DRAG,
      payload: {id, scope}
    };
  }

  static DROP = '[Drag] Drop';

  static drop(): Action {
    return {
      type: DragActions.DROP
    };
  }
}
