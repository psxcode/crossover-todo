import { RouterState } from '@ngrx/router-store';

import { IUserState } from './user.state';
import { IScreenState } from './screen.state';
import { ITodoState } from './todo.state';
import {IDragState} from './drag.state'

export interface IAppState {
  router: RouterState;
  screen: IScreenState;
  user: IUserState;
  todo: ITodoState;
  drag: IDragState;
}
