import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
const userSelector = (state: RootState) => state.userSlice.dataUser;
const filterUserSelector = (state: RootState) => state.userSlice.filter;

const remainingUser = createSelector(
  userSelector,
  filterUserSelector,
  (users, filter) => {
    const remainingUser = users.filter((user) => {
      let isCheckDate = true;
      if (filter.date[0] && filter.date[1]) {
        const endDate = new Date(filter.date[1]);
        const startDate = new Date(filter.date[0]);
        if (!(user.createTime > startDate && user.createTime < endDate))
          isCheckDate = false;
      }
      return user.name.includes(filter.name) && isCheckDate;
    });
    return remainingUser;
  }
);
export { remainingUser, userSelector };
