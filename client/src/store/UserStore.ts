/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { useState } from 'react';
import { SignInFormik } from 'formik-config/SignInUserFormik';
import setAuthToken from 'helpers/set-auth-token';
import { IUser, IUserInfo } from 'helpers/types';

interface IUserData {
  name: string;
  email: string;
  reactExperience: number | undefined;
}

interface IRegisterUserData extends IUserData {
  password: string;
  confirmPassword: string;
}

export interface IUserStore extends IUserInfo {
  registerUser: (data: IRegisterUserData, resetForm: () => void) => void;
  loginUser: (data: SignInFormik, resetForm: () => void) => void;
  getUser: () => void;
  logout: () => void;
  getUsers: () => void;
  removeUser: (userId: string) => void;
}

export const initialState = {
  userInfo: {
    _id: '',
    name: '',
    email: '',
    reactExperience: undefined,
    createdAt: '',
    updatedAt: '',
  },
  isAuthenticated: false,
  isLoading: true,
  users: [],
};

export const userStoreInitialState = {
  ...initialState,
  registerUser: () => undefined,
  loginUser: () => undefined,
  getUser: () => undefined,
  logout: () => undefined,
  getUsers: () => undefined,
  removeUser: () => undefined,
};

export const userStore = () => {
  const [userInfo, setUser] = useState(initialState.userInfo);
  const [isAuthenticated, setAuthenticated] = useState(initialState.isAuthenticated);
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setLoading] = useState(initialState.isLoading);

  const registerUser = async (userData: IRegisterUserData, resetForm: () => void) => {
    setLoading(true);
    try {
      const {
        data: { user, token },
      } = await axios.post('http://localhost:5000/api/user/register', userData);
      if (token) localStorage.setItem('token', token);
      setAuthToken(localStorage.getItem('token'));
      setAuthenticated(true);
      setUser((prevState) => ({ ...prevState, user }));
      resetForm();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const loginUser = async (userData: SignInFormik, resetForm: () => void) => {
    setLoading(true);
    try {
      const {
        data: { user, token },
      } = await axios.post('http://localhost:5000/api/user/login', userData);
      if (token) localStorage.setItem('token', token);
      setAuthToken(localStorage.getItem('token'));
      setAuthenticated(true);
      setUser((prevState) => ({ ...prevState, user }));
      resetForm();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken('');
    setAuthenticated(false);
    setUsers([]);
  };

  const getUser = async () => {
    if (localStorage.getItem('token')) setAuthToken(localStorage.getItem('token'));
    try {
      const {
        data: { user },
      } = await axios('http://localhost:5000/api/user');
      setAuthenticated(true);
      setUser((prevState) => ({ ...prevState, user }));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const getUsers = async () => {
    try {
      const {
        data: { users },
      } = await axios('http://localhost:5000/api/users');

      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  };

  const removeUser = async (userId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/delete/${userId}`);
      setUsers((prevState) => prevState.filter((user) => user._id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    userInfo,
    isAuthenticated,
    isLoading,
    users,
    registerUser,
    loginUser,
    getUser,
    logout,
    getUsers,
    removeUser,
  };
};
