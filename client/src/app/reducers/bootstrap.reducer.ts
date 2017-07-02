import { Action } from '@ngrx/store';

import { IBootstrapState } from '../state';
import { BootstrapActions } from '../actions';
import { BOOTSTRAP_STATE_ENUM } from '../models';

const initialState: IBootstrapState = {
  bootstrap: BOOTSTRAP_STATE_ENUM.NOT_BOOTSTRAPPED,
  message: ''
};

export function BootstrapReducer(state = initialState, action: Action): IBootstrapState {
  switch (action.type) {

    case BootstrapActions.BOOTSTRAP_FAIL: {
      return Object.assign({}, state, {
        bootstrap: BOOTSTRAP_STATE_ENUM.NOT_BOOTSTRAPPED
      });
    }

    case BootstrapActions.BOOTSTRAP_SUCCESS: {
      return Object.assign({}, state, {
        bootstrap: BOOTSTRAP_STATE_ENUM.BOOTSTRAPPED
      });
    }

    default: {
      return state;
    }
  }
}
