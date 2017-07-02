import { Action } from '@ngrx/store';

export class ScreenActions {

  static SET_SCREEN = '[Screen] Set Screen';

  static setScreen(tag: string): Action {
    return {
      type: ScreenActions.SET_SCREEN,
      payload: tag
    };
  }

  static SET_SCREEN_SUCCESS = '[Screen] Set Screen Success';

  static setScreenSuccess(tag: string): Action {
    return {
      type: ScreenActions.SET_SCREEN_SUCCESS,
      payload: tag
    };
  }

  static UNSET_SCREEN = '[Screen] Unset Screen';

  static unsetScreen(): Action {
    return {
      type: ScreenActions.UNSET_SCREEN
    };
  }

  static UNSET_SCREEN_SUCCESS = '[Screen] Unset Screen Success';

  static unsetScreenSuccess(): Action {
    return {
      type: ScreenActions.UNSET_SCREEN_SUCCESS
    };
  }

  static NAVIGATE = '[Screen] Navigate';

  static navigate(path: string, direction: string = 'right'): Action {
    return {
      type: ScreenActions.NAVIGATE,
      payload: {
        path,
        direction
      }
    };
  }

  static SET_DIRECTION = '[Screen] Set Direction';

  static setDirection(direction: string): Action {
    return {
      type: ScreenActions.SET_DIRECTION,
      payload: {
        direction
      }
    };
  }
}
