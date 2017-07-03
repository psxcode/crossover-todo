export interface ITodoAuthor {
  _id: string;
  username: string;
}

export interface ITodo {
  _id: string;
  title: string;
  description: string;
  status: string;
}

export interface IEditingTodo {
  id: string;
  editingTitle: boolean;
  editingDesc: boolean;
}

export const TODO_STATUS_COMPLETE = 'completed';
export const TODO_STATUS_NOT_COMPLETE = 'notCompleted';
