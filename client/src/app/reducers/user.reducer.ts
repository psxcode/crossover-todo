import { Action } from '@ngrx/store';

import { UserActions } from '../actions';
import { IUserState } from '../state';
import { DEFAULT_USER } from '../models';

const initialState: IUserState = {
  user: DEFAULT_USER,
  session: null
};

export function UserReducer(state = initialState, action: Action): IUserState {
  switch (action.type) {

    case UserActions.SET: {
      return Object.assign({}, state, action.payload);
    }

    case UserActions.UNSET: {
      return initialState;
    }

    case UserActions.LOGIN_FAILED: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
