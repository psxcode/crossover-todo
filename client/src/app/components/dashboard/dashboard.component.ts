import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { IAppState, ITodoState } from '../../state';
import { ScreenActions, TodoActions } from '../../actions';
import { ITodo, TODO_STATUS_NOT_COMPLETE, TODO_STATUS_COMPLETE } from '../../models';
import { toComplete, toIncomplete, findTodoById } from '../../utils';

@Component({
  selector: 'xo-dashboard',
  styleUrls: ['./dashboard.style.scss'],
  templateUrl: './dashboard.template.html',
})

export class DashboardComponent implements AfterViewInit, OnDestroy {

  complete$: Observable<ITodo[]> = null;
  incomplete$: Observable<ITodo[]> = null;
  destroyed$ = new Subject();

  constructor(private store: Store<IAppState>) {
    this.complete$ = store.select(toComplete);
    this.incomplete$ = store.select(toIncomplete);
  }

  ngAfterViewInit(): void {
    // Sliding is handled by ScreenEffects
    this.store.dispatch(ScreenActions.setScreen('xo-dashboard'));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  onCompleteDrop(id: string): void {
    this.incomplete$
      .take(1)
      .subscribe((todos: ITodo[]) => {
        const i = findTodoById(todos, id);
        if (i >= 0) {
          this.store.dispatch(TodoActions.edit(Object.assign({}, todos[i], {
            status: TODO_STATUS_COMPLETE
          })));
        }
      });
  }

  onIncompleteDrop(id: string): void {
    this.complete$
      .take(1)
      .subscribe((todos: ITodo[]) => {
        const i = findTodoById(todos, id);
        if (i >= 0) {
          this.store.dispatch(TodoActions.edit(Object.assign({}, todos[i], {
            status: TODO_STATUS_NOT_COMPLETE
          })));
        }
      });
  }
}
