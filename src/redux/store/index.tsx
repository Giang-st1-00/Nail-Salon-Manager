import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import jobReducer from '../slices/job';
import searchSlice from '../slices/job/search';

export const store = configureStore({
  reducer: {
    job: jobReducer,
    search : searchSlice,
  },
});

export type jobDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
