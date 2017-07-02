import {IUser} from '../models';

export interface IUserState {
    user: IUser;
    session: string;
}
