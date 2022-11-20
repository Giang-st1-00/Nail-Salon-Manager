import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProduct, IFilter } from "../../../model";

type TActiveUser = {
  darkMode: "light" | "dark";
  collapsed: boolean;
};
const initialState: TActiveUser = {
  darkMode: "light",
  collapsed: false,
};
const activeUserSlice = createSlice({
  name: "activeUser",
  initialState,
  reducers: {
    changeDarkMode: (state, action: PayloadAction<"light" | "dark">) => {
      state.darkMode = action.payload;
    },
    toggleCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload;
    },
  },
});
export default activeUserSlice.reducer;
export const { changeDarkMode, toggleCollapsed } = activeUserSlice.actions;
