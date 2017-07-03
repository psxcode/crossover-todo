import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs';

import { DataService } from '../services';
import { UserActions } from '../actions';
import { IUser } from '../models';
import { IUserState } from '../state';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions,
              private dataService: DataService) {
  }

  @Effect() login$ = this.actions$
    .ofType(UserActions.LOGIN)
    .map(toPayload)
    .switchMap(payload => this.dataService.login(payload.username, payload.password)
      .catch((e) => Observable.of({})))
    .map((userState: IUserState) => userState.session ?
      UserActions.setUser(userState.user, userState.session) :
      UserActions.loginFailed('Login credentials are incorrect.'));

  @Effect() logout$ = this.actions$
    .ofType(UserActions.LOGOUT)
    .do(() => this.dataService.logout())
    .map(() => UserActions.unset());
}
