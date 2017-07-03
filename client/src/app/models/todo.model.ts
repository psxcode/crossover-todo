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

export const TODO_STATUS_COMPLETE = 'completed';
export const TODO_STATUS_NOT_COMPLETE = 'notCompleted';
