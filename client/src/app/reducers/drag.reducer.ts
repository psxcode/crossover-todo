import { Action } from '@ngrx/store';

import { DragActions } from '../actions';
import { IDragState } from '../state';

const initialState: IDragState = {
  id: '',
  scope: ''
};

export function DragReducer(state = initialState, action: Action): IDragState {
  switch (action.type) {
    case DragActions.START_DRAG: {
      return Object.assign({}, state, action.payload);
    }

    case DragActions.DROP: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
