import { configureStore } from '@reduxjs/toolkit';
import { userSlice,jobSlice } from "../slices";

export const store = configureStore({
  reducer: {
    jobSlice,
    userSlice,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
