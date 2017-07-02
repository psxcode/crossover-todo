import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAppState } from '../../state';
import { BootstrapActions, ScreenActions } from '../../actions';

@Component({
  selector: 'hrz-login',
  templateUrl: './login.template.html',
  styleUrls: ['./login.style.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  private message$: Observable<string> = null;

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit(): void {
    this.message$ = this.store.select((state: IAppState) => state.bootstrap.message).distinctUntilChanged();
  }

  ngAfterViewInit(): void {
    this.store.dispatch(ScreenActions.setScreen('hrz-login'));
  }

  login(username: string, password: string): void {
    this.store.dispatch(BootstrapActions.login(username, password));
  }
}
