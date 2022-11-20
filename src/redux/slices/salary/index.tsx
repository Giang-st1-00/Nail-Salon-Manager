import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IFilter } from "../../../model";

type TFilter = { filter: { name: string; date: Array<string> } };
const initialState: TFilter = {
  filter: {
    name: "",
    date: ["", ""],
  },
};
const salarySlice = createSlice({
  name: "salary",
  initialState,
  reducers: {
    changeStatus: (state, action: PayloadAction<IFilter>) => {
      state.filter = action.payload;
    },
  },
});
export default salarySlice.reducer;
export const { changeStatus } = salarySlice.actions;
