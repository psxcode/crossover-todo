import { IAppState, IUserState } from '../state';
import { IUser } from '../models';

export function toUser(state: IAppState): IUserState {
  return state.user;
}

export function toUserData(state: IAppState): IUser {
  return toUser(state).user;
}

export function toUserSession(state: IAppState): string {
  return toUser(state).session;
}

export function toUserValid(state: IAppState): boolean {
  return toUser(state).session != null;
}

export function randomAvatar(): string {
  const i = Math.floor((Math.random() * 99) + 0.5);
  return `http://randomuser.me/api/thumb/men/${i}.jpg`;
}
