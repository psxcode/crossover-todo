import { RouterState } from '@ngrx/router-store';

import { IBootstrapState } from './bootstrap.state';
import { IUserState } from './user.state';
import { IScreenState } from './screen.state';

export interface IAppState {
  router: RouterState;
  bootstrap: IBootstrapState;
  screen: IScreenState;
  user: IUserState;
}
