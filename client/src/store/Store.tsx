/* Copyright © Bankers Healthcare Group, Inc.  All rights reserved. */

import { createContext, FC, useContext } from 'react';
import { userStore, userStoreInitialState, IUserStore } from 'store/UserStore';

interface IInitialStore {
  userContext: IUserStore;
}

const initialStore: IInitialStore = {
  userContext: userStoreInitialState,
};

export const StoreContext = createContext<IInitialStore>(initialStore);

export const Store: FC = ({ children }) => {
  const userContext = userStore();

  return <StoreContext.Provider value={{ userContext }}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
