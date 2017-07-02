import { Action } from '@ngrx/store';

import { ScreenActions } from '../actions';
import { IScreenState } from '../state';

const initialState: IScreenState = {
  tag: '',
  slide: 'right'
};

export function ScreenReducer(state = initialState, action: Action): IScreenState {
  switch (action.type) {
    case ScreenActions.SET_SCREEN_SUCCESS: {
      return Object.assign({}, state, {
        tag: action.payload
      });
    }

    case ScreenActions.UNSET_SCREEN_SUCCESS: {
      return Object.assign({}, state, {
        tag: ''
      });
    }

    case ScreenActions.SET_DIRECTION: {
      return Object.assign({}, state, {
        slide: action.payload.direction
      });
    }

    default: {
      return state;
    }
  }
}
