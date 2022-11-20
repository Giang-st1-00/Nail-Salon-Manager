import { configureStore } from "@reduxjs/toolkit";
import { userSlice, productSlice, activeUser ,jobSlice } from "../slices";
const store = configureStore({
  reducer: {
    jobSlice,
    userSlice,
    productSlice,
    activeUser,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
