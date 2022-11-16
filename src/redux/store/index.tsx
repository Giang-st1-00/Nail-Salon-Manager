import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../slices";
const store = configureStore({
  reducer: {
    userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
