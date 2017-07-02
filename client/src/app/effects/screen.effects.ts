import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs';

import { IAppState, IScreenState } from '../state';
import { ScreenActions } from '../actions';
import { slideIn, slideOut, opposite } from '../utils';

@Injectable()
export class ScreenEffects {

  screenState: IScreenState = null;

  constructor(private actions$: Actions,
              private store: Store<IAppState>) {

    // subscribe
    this.store.select((state: IAppState) => state.screen)
      .subscribe((screen: IScreenState) => {
        this.screenState = screen;
      });
  }

  @Effect() set$ = this.actions$
    .ofType(ScreenActions.SET_SCREEN)
    .map(toPayload)
    .map((tag: string) => {

      // Slide In
      if (this.screenState.tag !== tag) {
        slideIn(tag, this.screenState.slide);
      }

      return ScreenActions.setScreenSuccess(tag);

    });

  @Effect() unsetScreen$ = this.actions$
    .ofType(ScreenActions.UNSET_SCREEN)
    .map(() => {

      // Slide Out
      if (this.screenState.tag) {
        slideOut(this.screenState.tag, opposite(this.screenState.slide));
      }

      return ScreenActions.unsetScreenSuccess();
    });

  @Effect() navigate = this.actions$
    .ofType(ScreenActions.NAVIGATE)
    .map(toPayload)
    .switchMap(payload => Observable.concat(
      Observable.of(ScreenActions.setDirection(payload.direction)),
      Observable.of(go([payload.path]))
    ));
}
