import {
  toComplete,
  toIncomplete,
  spliceTodos,
  findTodoById,
  isTodoComplete,
  isTodoIncomplete
} from './todo';

import { IAppState } from '../state';
import { ITodo } from '../models';

describe('toComplete', () => {

  it('returns complete todos array', () => {
    const state = {
      todo: {
        complete: [],
      }
    };

    expect(toComplete(state as IAppState))
      .toEqual([]);
  });
});

describe('toIncomplete', () => {

  it('returns incomplete todos array', () => {
    const state = {
      todo: {
        incomplete: [],
      }
    };

    expect(toIncomplete(state as IAppState))
      .toEqual([]);
  });
});

describe('spliceTodos', () => {

  /*it('returns sliced todos array', () => {
    const todos = [1, 2, 3];

    expect(spliceTodos(todos as ITodo[], 1))
      .toEqual([1, 3]);
  });*/
});
