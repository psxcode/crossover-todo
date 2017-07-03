import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { IAppState } from '../../state';
import { IUser } from '../../models';
import { UserActions } from '../../actions';
import { toUserValid, toUserData } from '../../utils';

function toFirstname(user: IUser): string {
  return user.firstname;
}

function toAvatar(user: IUser): string {
  return user.avatar;
}

@Component({
  templateUrl: './user-info.template.html',
  styleUrls: ['./user-info.style.scss'],
  selector: 'xo-user-info'
})
export class UserInfoWidgetComponent implements OnDestroy {

  firstname$: Observable<string> = null;
  userValid$: Observable<boolean> = null;
  avatar$: Observable<string> = null;
  showAvatar$: Observable<boolean> = null;
  destroyed$ = new Subject();

  constructor(private store: Store<IAppState>) {
    const userData$ = store.select(toUserData),
      firstname$ = userData$.map(toFirstname),
      userValid$ = store.select(toUserValid),

      showAvatar$ = new BehaviorSubject<boolean>(false),
      avatar$ = userData$.map(toAvatar)
        .distinctUntilChanged()
        .do(() => showAvatar$.next(false))
        .delay(400)
        .do(() => showAvatar$.next(true));

    this.firstname$ = firstname$;
    this.userValid$ = userValid$;
    this.avatar$ = avatar$;
    this.showAvatar$ = showAvatar$.asObservable();
  }

  logout(): void {
    this.store.dispatch(UserActions.logout());
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
