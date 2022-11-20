import { RootState } from "../../store";
export const darkModeSelector = (state: RootState) =>
  state.activeUserSlice.darkMode;
export const collapsedSelector = (state: RootState) =>
  state.activeUserSlice.collapsed;
