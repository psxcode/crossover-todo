import { Component, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { IAppState } from '../../state';
import { ITodo, TODO_STATUS_NOT_COMPLETE, IUser } from '../../models';
import { TodoActions } from '../../actions';
import { toUserData } from '../../utils';

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

  @ViewChild('title') titleRef: ElementRef;
  @ViewChild('desc') descRef: ElementRef;
  @Input() model: ITodo = DEFAULT_TODO;

  titleEditing: boolean = false;
  descEditing: boolean = false;

  author$: Observable<string> = null;

  destroyed$ = new Subject();

  constructor(private store: Store<IAppState>) {
    this.author$ = store.select(toUserData)
      .map((user: IUser) => user.firstname);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  onTitleEdit(): void {
    this.titleEditing = true;

    const el = this.titleRef.nativeElement;
    el.value = this.model.title;
    setTimeout(() => {
      el.focus();
    }, 0);

  }

  onDescEdit(): void {
    this.descEditing = true;

    const el = this.descRef.nativeElement;
    el.value = this.model.description;
    setTimeout(() => {
      el.focus();
    });
  }

  onTitleEditApply(): void {
    const value = this.titleRef.nativeElement.value;
    if (this.model.title !== value) {
      this.store.dispatch(TodoActions.edit(Object.assign({}, this.model, {
        title: value
      })));
    }
    this.titleEditing = false;
  }

  onDescEditApply(): void {
    const value = this.descRef.nativeElement.value;
    if (this.model.description !== value) {
      this.store.dispatch(TodoActions.edit(Object.assign({}, this.model, {
        description: value
      })));
    }
    this.descEditing = false;
  }

  onClose(): void {
    this.store.dispatch(TodoActions.remove(this.model._id));
  }
}
