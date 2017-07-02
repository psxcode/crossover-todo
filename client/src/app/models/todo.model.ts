export interface ITodoAuthor {
  _id: string;
  username: string;
}

export interface ITodo {
  _id: string;
  title: string;
  description: string;
  status: string;
  author: ITodoAuthor;
}

export const TODO_STATUS_COMPLETE = 'complete';
export const TODO_STATUS_NOT_COMPLETE = 'notComplete';
