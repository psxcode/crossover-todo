import { Action } from '@ngrx/store';
import { IUser } from '../models';

export class UserActions {

  static LOGIN = '[User] Login';

  static login(username: string, password: string): Action {
    return {
      type: UserActions.LOGIN,
      payload: {username, password}
    };
  }

  static LOGIN_FAILED = '[User] Login Failed';

  static loginFailed(message: string): Action {
    return {
      type: UserActions.LOGIN_FAILED,
      payload: {message}
    };
  }

  static LOGOUT = '[User] Logout';

  static logout(): Action {
    return {
      type: UserActions.LOGOUT
    };
  }

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
