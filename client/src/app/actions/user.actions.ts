import { Action } from '@ngrx/store';
import { IUser } from '../models';

export class UserActions {

  static SET = '[User] Set';

  static setUser(user: IUser, session: string): Action {
    return {
      type: UserActions.SET,
      payload: {user, session}
    };
  }

  static UNSET = '[User] Unset';

  static unset(): Action {
    return {
      type: UserActions.UNSET
    };
  }
}
