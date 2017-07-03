import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { IAppState, IDragState } from '../../state';
import { DragActions } from '../../actions';

@Directive({
  selector: '[droppable]'
})
export class DroppableDirective implements OnInit, OnDestroy {

  @Output() onDragEnter: EventEmitter<any> = new EventEmitter();
  @Output() onDragLeave: EventEmitter<any> = new EventEmitter();
  @Output() onDrop: EventEmitter<string> = new EventEmitter();
  @Input() dragOverClass = 'drag-over-border';
  @Input() dragHintClass = 'drag-hint-border';
  @Input() dropScope: string = 'default';

  draggingId: string = '';
  destroyed$ = new Subject<any>();

  constructor(private store: Store<IAppState>,
              private el: ElementRef) {
  }

  ngOnInit(): void {
    this.store.select((state: IAppState) => state.drag)
      .filter((drag: IDragState) => !!drag.id && drag.scope === this.dropScope)
      .takeUntil(this.destroyed$)
      .subscribe((drag: IDragState) => {
        this.draggingId = drag.id;
        this.el.nativeElement.classList.add(this.dragHintClass);
      });

    this.store.select((state: IAppState) => state.drag)
      .filter((drag: IDragState) => !drag.id)
      .takeUntil(this.destroyed$)
      .subscribe(() => {
        this.draggingId = '';
        this.el.nativeElement.classList.remove(this.dragHintClass);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  @HostListener('dragenter', ['$event'])
  dragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    this.onDragEnter.emit(e);

    if (this.draggingId) {
      this.el.nativeElement.classList.add(this.dragOverClass);
    }
  }

  @HostListener('dragover', ['$event'])
  dragOver(e) {
    e.preventDefault();
  }

  @HostListener('dragleave', ['$event'])
  dragLeave(e) {
    e.preventDefault();

    this.el.nativeElement.classList.remove(this.dragOverClass);
    this.onDragLeave.emit(e);
  }

  @HostListener('drop', ['$event'])
  drop(e) {
    e.preventDefault();
    e.stopPropagation();

    this.el.nativeElement.classList.remove(this.dragOverClass);

    if (this.draggingId) {
      this.onDrop.emit(this.draggingId);
      this.draggingId = '';
      this.store.dispatch(DragActions.drop());
    }
  }
}
