import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import schemaReducer, { SchemaState } from './schemaSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    schema: schemaReducer,
  },
});

export type RootState = {
  auth: ReturnType<typeof authReducer>;
  schema: SchemaState; 
};

export type AppDispatch = typeof store.dispatch;
