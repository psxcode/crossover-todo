import { ITodo, IEditingTodo } from '../models';

export interface ITodoState {
  complete: ITodo[];
  incomplete: ITodo[];
  editing: IEditingTodo;
}
