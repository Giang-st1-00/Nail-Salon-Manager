import { configureStore } from "@reduxjs/toolkit";
import { userSlice, productSlice, activeUser } from "../slices";
const store = configureStore({
  reducer: {
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
