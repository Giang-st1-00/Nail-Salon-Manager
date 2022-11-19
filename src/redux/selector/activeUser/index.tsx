import { RootState } from "../../store";
export const darkModeSelector = (state: RootState) => state.activeUser.darkMode;
export const collapsedSelector = (state: RootState) =>
  state.activeUser.collapsed;
