import { createSlice, PayloadActionCreator } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser, IFilter } from "../../../model";

type TUserState = {
  filter: {
    name: string;
    date: Array<string>;
  };
  dataUser: Array<IUser>;
};
const initialState: TUserState = {
  filter: {
    name: "",
    date: ["", ""],
  },
  dataUser: [
    {
      key: "1",
      name: "Tinh",
      nickName: "DT",
      age: 12,
      email: "Tranduytinh@gmail.com",
      address: "Ngu Hanh Son",
      gender: "male",
      createTime: new Date("2022-03-25"),
    },
    {
      key: "2",
      name: "Giang",
      nickName: "TG",
      age: 21,
      email: "Giang@gmail.com",
      address: "Quang Trung",
      gender: "male",
      createTime: new Date("2022-06-03"),
    },
  ],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  
    addUser: (state, action: PayloadAction<IUser>) => {
      state.dataUser.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.dataUser = state.dataUser.filter(
        (user) => user.key !== action.payload
      );
    },
    deleteListUSer: (state, action: PayloadAction<React.Key[]>) => {
      state.dataUser = state.dataUser.filter(
        (user) => !action.payload.includes(user.key)
      );
    },
    editUser: (state, action: PayloadAction<IUser>) => {
      const indexEditUser = state.dataUser.findIndex(
        (user) => user.key === action.payload.key
      );
      state.dataUser[indexEditUser] = action.payload;
    },
    changeStatus: (state, action: PayloadAction<IFilter>) => {
      state.filter = action.payload;
    },
  },
});
export default userSlice.reducer;
export const { addUser, deleteUser, deleteListUSer, editUser, changeStatus } =
  userSlice.actions;
