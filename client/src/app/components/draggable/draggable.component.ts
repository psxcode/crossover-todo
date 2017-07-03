import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../state';
import { DragActions } from '../../actions';
import { matches } from '../../utils';

@Directive({
  selector: '[draggable]',
  host: {
    '[draggable]': 'true'
  }
})
export class DraggableDirective implements OnInit {

  @Input() dragData: any;
  @Input() dragHandle: string;
  @Input() dragScope: string = 'default';
  @Input() dragHandleClass = 'drag-handle';
  @Input() dragClass = 'drag-border';

  @Input()
  set dragEnabled(value: boolean) {
    this._dragEnabled = value;
    this.applyDragHandleClass();
  };

  get dragEnabled() {
    return this._dragEnabled;
  }

  @Output() onDragStart: EventEmitter<any> = new EventEmitter();
  @Output() onDragEnd: EventEmitter<any> = new EventEmitter();

  mouseOverElement: any;
  _dragEnabled = true;

  constructor(private store: Store<IAppState>,
              private el: ElementRef) {
  }

  ngOnInit(): void {
    this.applyDragHandleClass();
  }

  @HostListener('dragstart', ['$event'])
  dragStart(e): void {
    if (this.allowDrag()) {
      e.stopPropagation();

      this.el.nativeElement.classList.add(this.dragClass);

      this.store.dispatch(DragActions.startDrag(this.dragData._id, this.dragScope));

      // Firefox requires setData() to be called otherwise the drag does not work.
      // We don't use setData() to transfer data anymore so this is just a dummy call.
      if (e.dataTransfer != null) {
        e.dataTransfer.setData('text', '');
      }

      this.onDragStart.emit(e);
    } else {
      e.preventDefault();
    }
  }

  @HostListener('dragend', ['$event'])
  dragEnd(e): void {
    e.stopPropagation();
    e.preventDefault();

    this.el.nativeElement.classList.remove(this.dragClass);

    this.store.dispatch(DragActions.drop());

    this.onDragEnd.emit(e);
  }

  @HostListener('mouseover', ['$event'])
  mouseover(e): void {
    this.mouseOverElement = e.target;
  }

  allowDrag(): boolean {
    if (this.dragHandle) {
      return matches(this.mouseOverElement, this.dragHandle) && this.dragEnabled;
    } else {
      return this.dragEnabled;
    }
  }

  applyDragHandleClass(): void {
    const dragElement: Element = this.getDragHandleElement();
    if (this.dragEnabled) {
      dragElement.classList.add(this.dragHandleClass);
    } else {
      dragElement.classList.remove(this.dragHandleClass);
    }
  }

  getDragHandleElement(): Element {
    return this.dragHandle ?
      this.el.nativeElement.querySelector(this.dragHandle) :
      this.el.nativeElement;
  }
}
