import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export type RootState = ReturnType<typeof store.getState>;

declare module 'react-redux' {
  export interface DefaultRootState extends RootState {}
}

const store = configureStore({
  reducer: rootReducer,
});

export default store;
