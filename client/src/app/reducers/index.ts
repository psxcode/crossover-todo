import { compose } from '@ngrx/core/compose';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { routerReducer, RouterState } from '@ngrx/router-store';

import { UserReducer } from './user.reducer';
import { ScreenReducer } from './screen.reducer';
import { TodoReducer } from './todo.reducer';
import { DragReducer } from './drag.reducer';

export const syncReducers = {
  router: routerReducer,
  screen: ScreenReducer,
  user: UserReducer,
  todo: TodoReducer,
  drag: DragReducer,
};

function deepCombineReducers(allReducers: any): ActionReducer<any> {
  Object.getOwnPropertyNames(allReducers).forEach((prop) => {
    if (allReducers.hasOwnProperty(prop)
      && allReducers[prop] !== null
      && typeof allReducers[prop] !== 'function') {
      allReducers[prop] = deepCombineReducers(allReducers[prop]);
    }
  });
  return combineReducers(allReducers);
}

const DEV_REDUCERS = [storeFreeze, storeLogger()];

export function rootReducer(state: any, action: any, asyncReducer) {
  const reducers = {...syncReducers, ...asyncReducer};

  if (ENV === 'DEV') {
    return compose(...DEV_REDUCERS, deepCombineReducers)(reducers)(state, action);
  } else {
    return deepCombineReducers(reducers)(state, action);
  }
}
