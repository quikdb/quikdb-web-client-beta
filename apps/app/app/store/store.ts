// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { AuthState } from './authSlice';  // Import AuthState here

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Now you can use `AuthState` as part of the root state type
export type RootState = {
  auth: AuthState;
};

export type AppDispatch = typeof store.dispatch;
