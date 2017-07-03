import { RouterState } from '@ngrx/router-store';

import { IUserState } from './user.state';
import { IScreenState } from './screen.state';

export interface IAppState {
  router: RouterState;
  screen: IScreenState;
  user: IUserState;
}
