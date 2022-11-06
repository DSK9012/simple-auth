/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { useState } from 'react';
import { SignInFormik } from 'formik-config/SignInUserFormik';
import setAuthToken from 'helpers/set-auth-token';
import { IUserInfo } from 'helpers/types';

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
};

export const userStoreInitialState = {
  ...initialState,
  registerUser: () => undefined,
  loginUser: () => undefined,
  getUser: () => undefined,
};

export const userStore = () => {
  const [userInfo, setUser] = useState(initialState.userInfo);
  const [isAuthenticated, setAuthenticated] = useState(initialState.isAuthenticated);
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
      setLoading(false);
      resetForm();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
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
      setLoading(false);
      resetForm();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const getUser = async () => {
    if (localStorage.getItem('token')) setAuthToken(localStorage.getItem('token'));
    try {
      const {
        data: { user },
      } = await axios('http://localhost:5000/api/user');
      setAuthenticated(true);
      setUser((prevState) => ({ ...prevState, user }));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return {
    userInfo,
    isAuthenticated,
    isLoading,
    registerUser,
    loginUser,
    getUser,
  };
};
