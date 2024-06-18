
import { configureStore } from '@reduxjs/toolkit';
import timezoneReducer from './timezoneSlice';

const store = configureStore({
  reducer: {
    timezone: timezoneReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
