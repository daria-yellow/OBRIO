import { configureStore } from '@reduxjs/toolkit';
import userDataSlice from './slices/userDataSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      userData: userDataSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
