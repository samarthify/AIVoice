import { configureStore } from '@reduxjs/toolkit';
import voiceReducer from './voiceSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    voice: voiceReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
