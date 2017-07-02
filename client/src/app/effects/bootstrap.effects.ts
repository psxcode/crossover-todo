import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs';

import { DataService } from '../services';
import { BootstrapActions, UserActions } from '../actions';
import { IUser } from '../models';
import { IUserState } from '../state';

@Injectable()
export class BootstrapEffects {

  constructor(private actions$: Actions,
              private dataService: DataService) {
  }

  @Effect() login$ = this.actions$
    .ofType(BootstrapActions.LOGIN)
    .map(toPayload)
    .switchMap(payload => this.dataService.login(payload.username, payload.password))
    .map((userState: IUserState) => userState.session ?
      UserActions.setUser(userState.user, userState.session) :
      BootstrapActions.logout('Login credentials are incorrect.'));

  @Effect() logout$ = this.actions$
    .ofType(BootstrapActions.LOGOUT)
    .map(toPayload)
    .switchMap(() => this.dataService.logout())
    .map(() => UserActions.unset());
}
