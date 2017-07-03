import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAppState } from '../../state';
import { UserActions, ScreenActions } from '../../actions';

@Component({
  selector: 'xo-login',
  templateUrl: './login.template.html',
  styleUrls: ['./login.style.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  message$: Observable<string> = null;

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit(): void {
    // this.message$ = this.store.select((state: IAppState) => state.bootstrap.message);
  }

  ngAfterViewInit(): void {
    this.store.dispatch(ScreenActions.setScreen('xo-login'));
  }

  login(username: string, password: string): void {
    this.store.dispatch(UserActions.login(username, password));
  }
}
