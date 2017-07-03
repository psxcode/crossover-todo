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
    .switchMap(({user, session}: IUserState) => session ?
      Observable.concat(
        Observable.of(UserActions.setUser(user, session)),
        this.dataService.getTodos().map(TodoActions.set)
      ) :
      Observable.of(UserActions.loginFailed('Login credentials are incorrect.')));

  @Effect() logout$ = this.actions$
    .ofType(UserActions.LOGOUT)
    .do(() => this.dataService.logout())
    .switchMap(() => Observable.concat(
      Observable.of(TodoActions.clear()),
      Observable.of(UserActions.unset())
    ));

  @Effect() add$ = this.actions$
    .ofType(TodoActions.ADD)
    .map(toPayload)
    .switchMap(({title, desc}: { title: string, desc: string }) => (
      this.dataService.addTodo(title, desc))
    )
    .switchMap(() => this.dataService.getTodos())
    .map(TodoActions.set);

  @Effect() edit$ = this.actions$
    .ofType(TodoActions.EDIT)
    .map(toPayload)
    .switchMap(({todo}: { todo: ITodo }) => this.dataService.editTodo(todo))
    .switchMap(() => this.dataService.getTodos())
    .map(TodoActions.set);

  @Effect() remove$ = this.actions$
    .ofType(TodoActions.REMOVE)
    .map(toPayload)
    .switchMap(({id}: { id: string }) => this.dataService.deleteTodo(id).map(() => id))
    .switchMap(() => this.dataService.getTodos())
    .map(TodoActions.set);
}
