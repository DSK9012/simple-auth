/* eslint-disable no-unused-vars */
export type FormTypes = 'sign-in-form' | 'sign-up-form';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  reactExperience: number | undefined;
  createdAt: string;
  updatedAt: string;
}

export interface IUserInfo {
  userInfo: IUser;
  isAuthenticated: boolean;
  isLoading: boolean;
}
