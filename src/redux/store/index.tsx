import { configureStore } from "@reduxjs/toolkit";
import { userSlice, productSlice, activeUserSlice, jobSlice } from "../slices";
const store = configureStore({
  reducer: {
    userSlice,
    productSlice,
    activeUserSlice,
    jobSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
