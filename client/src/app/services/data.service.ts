import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable, AsyncSubject, Subject } from 'rxjs';

import { IAppState, IUserState } from '../state';
import { ITodo, TODO_STATUS_COMPLETE, TODO_STATUS_NOT_COMPLETE } from '../models';
import { toUserSession, md5, randomAvatar } from '../utils';

interface IResponse {
  status: string;
}

interface ILoginResponse extends IResponse {
  sessionId?: string;
  username?: string;
}

interface ITodosResponse extends IResponse {
  data: ITodo[];
}

interface ITodoResponse extends IResponse {
  data: ITodo;
}

function toJson(res: Response): any {
  return res.json();
}

function toUserState(res: ILoginResponse): IUserState {
  return {
    user: {
      firstname: res.username,
      avatar: randomAvatar()
    },
    session: res.sessionId
  };
}

function toStatusSuccess(res: IResponse): boolean {
  return res.status === 'success';
}

function toTodos(res: ITodosResponse): ITodo[] {
  return res.data;
}

function toTodo(res: ITodoResponse): ITodo {
  return res.data;
}

const REQ_HEADERS = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});

const REQ_OPTIONS = new RequestOptions({
  headers: REQ_HEADERS
});

@Injectable()
export class DataService {

  userSession$: Observable<string> = null;

  constructor(private store: Store<IAppState>,
              private http: Http) {
    this.userSession$ = store.select(toUserSession);
  }

  login(username: string = '', password: string = ''): Observable<IUserState> {
    const req = `${API_BASE_URL}/user/auth`,
      post = {
        username,
        password: md5(password)
      };

    return this.http.post(req, post, REQ_OPTIONS)
      .map(toJson)
      .map(toUserState);
  }

  logout(): Observable<boolean> {
    return this.userSession$.switchMap((session: string) => {
      const req = `${API_BASE_URL}/user/logout?sessionId=${session}`;

      return this.http.get(req, REQ_OPTIONS)
        .map(toJson)
        .map(toStatusSuccess);
    });
  }

  getTodos(skip: number = 0, limit: number = 0): Observable<ITodo[]> {
    return this.userSession$.switchMap((session: string) => {
      const req = `${API_BASE_URL}/todos?sessionId=${session}&skip=${skip}&limit=${limit}`;

      return this.http.get(req, REQ_OPTIONS)
        .map(toJson)
        .map(toTodos);
    });
  }

  addTodo(title: string, description: string): Observable<ITodo> {
    return this.userSession$.switchMap((session: string) => {
      const req = `${API_BASE_URL}/todo?sessionId=${session}`,
        body = {
          title,
          description,
          status: TODO_STATUS_NOT_COMPLETE
        };

      return this.http.put(req, body, REQ_OPTIONS)
        .map(toJson)
        .map(toTodo);
    });
  }

  editTodo(id: string, title: string, description: string, isComplete: boolean): Observable<ITodo> {
    return this.userSession$.switchMap((session: string) => {
      const req = `${API_BASE_URL}/todo?sessionId=${session}`,
        body = {
          id,
          title,
          description,
          status: isComplete ? TODO_STATUS_COMPLETE : TODO_STATUS_NOT_COMPLETE
        };

      return this.http.put(req, body, REQ_OPTIONS)
        .map(toJson)
        .map(toTodo);
    });
  }

  deleteTodo(id: string): Observable<boolean> {
    return this.userSession$.switchMap((session: string) => {
      const req = `${API_BASE_URL}/todo?sessionId=${session}`,
        body = {id};

      return this.http.delete(req, new RequestOptions({headers: REQ_HEADERS, body}))
        .map(toJson)
        .map(toStatusSuccess);
    });
  }
}

