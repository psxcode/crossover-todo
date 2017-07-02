import { Component, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { BootstrapActions, ScreenActions } from '../../actions';
import { IAppState } from '../../state';

@Component({
  selector: 'my-app',
  styleUrls: ['./app.style.scss'],
  templateUrl: './app.template.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit, OnDestroy {
  destroyed$ = new Subject();

  constructor(private store: Store<IAppState>) {
  }

  ngAfterViewInit(): void {

    this.store.dispatch(BootstrapActions.bootstrap());
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
