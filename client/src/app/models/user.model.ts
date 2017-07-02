export interface IUser {
  firstname: string,
  avatar: string
}

export const DEFAULT_USER: IUser = {
  firstname: 'Guest',
  avatar: 'assets/user.png'
};
