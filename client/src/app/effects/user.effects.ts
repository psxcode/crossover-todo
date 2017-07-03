import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs';

import { DataService } from '../services';
import { UserActions, TodoActions } from '../actions';
import { IUser, ITodo } from '../models';
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
    .switchMap((userState: IUserState) => userState.session ?
      Observable.merge(
        Observable.of(UserActions.setUser(userState.user, userState.session)),
        this.dataService.getTodos(0, 0).map(TodoActions.set)
      ) :
      Observable.of(UserActions.loginFailed('Login credentials are incorrect.')));

  @Effect() logout$ = this.actions$
    .ofType(UserActions.LOGOUT)
    .do(() => this.dataService.logout())
    .switchMap(() => Observable.merge(
      Observable.of(UserActions.unset()),
      Observable.of(TodoActions.removeAll())
    ));
}
