import { Action } from '@ngrx/store';

export class BootstrapActions {

  static BOOTSTRAP = '[Bootstrap] Bootstrap';

  static bootstrap(): Action {
    return {
      type: BootstrapActions.BOOTSTRAP
    };
  }

  static LOGIN = '[Bootstrap] Login';

  static login(username: string, password: string): Action {
    return {
      type: BootstrapActions.LOGIN,
      payload: {
        username,
        password
      }
    };
  }

  static LOGOUT = '[Bootstrap] Logout';

  static logout(message?: string): Action {
    return {
      type: BootstrapActions.LOGOUT,
      payload: {
        message: message
      }
    };
  }

  static LOGIN_FAIL = '[Bootstrap] Login Fail';

  static loginFail(): Action {
    return {
      type: BootstrapActions.LOGIN_FAIL
    };
  }

  static LOGIN_SUCCESS = '[Bootstrap] Login Success';

  static loginSuccess(): Action {
    return {
      type: BootstrapActions.LOGIN_SUCCESS
    };
  }

  static LOGOUT_SUCCESS = '[Bootstrap] Logout Success';

  static logoutSuccess(message?: string): Action {
    return {
      type: BootstrapActions.LOGOUT_SUCCESS,
      payload: {
        message: message
      }
    };
  }

  static BOOTSTRAP_FAIL = '[Bootstrap] Bootstrap Fail';

  static bootstrapFail(): Action {
    return {
      type: BootstrapActions.BOOTSTRAP_FAIL
    };
  }

  static BOOTSTRAP_SUCCESS = '[Bootstrap] Bootstrap Success';

  static bootstrapSuccess(): Action {
    return {
      type: BootstrapActions.BOOTSTRAP_SUCCESS
    };
  }
}
