import { Component, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { IAppState } from '../../state';
import { ITodo, TODO_STATUS_NOT_COMPLETE } from '../../models';
import { TodoActions } from '../../actions';
import {} from '../../utils';

const DEFAULT_TODO: ITodo = {
  _id: '',
  title: 'Title',
  description: 'Description',
  status: TODO_STATUS_NOT_COMPLETE
};

@Component({
  templateUrl: './todo.template.html',
  styleUrls: ['./todo.style.scss'],
  selector: 'xo-todo'
})
export class TodoWidgetComponent implements OnDestroy {

  @Input() model: ITodo = DEFAULT_TODO;
  destroyed$ = new Subject();

  constructor(private store: Store<IAppState>) {

  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
