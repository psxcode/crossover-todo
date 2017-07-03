import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('username') usernameRef: ElementRef;
  @ViewChild('password') passwordRef: ElementRef;

  message$: Observable<string> = null;

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit(): void {
    // this.message$ = this.store.select((state: IAppState) => state.bootstrap.message);
  }

  ngAfterViewInit(): void {
    this.usernameRef.nativeElement.focus();
    this.store.dispatch(ScreenActions.setScreen('xo-login'));
  }

  login(): void {
    this.store.dispatch(UserActions
      .login(this.usernameRef.nativeElement.value, this.passwordRef.nativeElement.value));
  }
}
