import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SliceState = {
  valueSearch: string;
  valueDate : string;
};

const initialState: SliceState = { valueSearch :  "" , valueDate : ""};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateNameJob : (state, action: PayloadAction<string>) => {
      state.valueSearch = action.payload;
    },
    updateAllSearch : (state, action: PayloadAction<any>) => {
      state.valueSearch = action.payload.valueSearch;
      state.valueDate = action.payload.valueDate;
    },
  },
});

export const { updateNameJob , updateAllSearch } = searchSlice.actions;
export default searchSlice.reducer;
