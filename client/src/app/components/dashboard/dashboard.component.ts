import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { IAppState } from '../../state';
import { ScreenActions } from '../../actions';

@Component({
  selector: 'xo-dashboard',
  styleUrls: ['./dashboard.style.scss'],
  templateUrl: './dashboard.template.html',
})

export class DashboardComponent implements AfterViewInit, OnDestroy {
  destroyed$ = new Subject();

  constructor(private store: Store<IAppState>) {
  }

  ngAfterViewInit(): void {

    // Sliding is handled by ScreenEffects
    this.store.dispatch(ScreenActions.setScreen('xo-dashboard'));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
