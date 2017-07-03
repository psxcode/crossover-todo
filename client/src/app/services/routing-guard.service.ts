import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAppState } from '../state';
import { ScreenActions } from '../actions';
import { urlStripQueryParams, urlLastChunk, toUserValid } from "../utils";

@Injectable()
export class RoutingGuardService implements CanActivate {

  userValid$: Observable<boolean> = null;

  constructor(private store: Store<IAppState>) {

    const userValid$ = store.select(toUserValid);

    /*redirect*/
    userValid$.subscribe((valid: boolean) => {
      store.dispatch(ScreenActions.navigate(valid ? '' : 'login'));
    });

    this.userValid$ = userValid$;
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {

    // strip query params
    const url: string = urlLastChunk(urlStripQueryParams(state.url));

    // return Observable.of(true);

    return this.store.select(toUserValid)
      .map((valid: boolean) => valid ? (url !== 'login') : (url === 'login'))
      .do((can: boolean) => {
        if (can) {
          this.store.dispatch(ScreenActions.unsetScreen());
        }
      });
  }
}
