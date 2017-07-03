import {ITodo} from '../models';

export interface ITodoState {
  complete: ITodo[];
  incomplete: ITodo[];
}
