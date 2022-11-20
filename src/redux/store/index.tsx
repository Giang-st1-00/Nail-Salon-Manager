import { configureStore } from "@reduxjs/toolkit";

import {
  userSlice,
  productSlice,
  activeUserSlice,
  jobSlice,
  salarySlice,
} from "../slices";
const store = configureStore({
  reducer: {
    jobSlice,
    userSlice,
    productSlice,
    activeUserSlice,
    salarySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
