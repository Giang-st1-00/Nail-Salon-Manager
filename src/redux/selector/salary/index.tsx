import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
const userSelector = (state: RootState) => state.userSlice.dataUser;
const jobSelector = (state: RootState) => state.jobSlice.dataJob;

const filterJobSelector = (state: RootState) => state.productSlice.filter;
const remainingSalary = createSelector(
  userSelector,
  jobSelector,
  filterJobSelector,
  (users, jobs, filter) => {
    // const filterJob = jobs.filter((job) => {
    //   let isCheckDate = true;
    //   if (filter.date[0] && filter.date[1]) {
    //     const endDate = new Date(filter.date[1]);
    //     const startDate = new Date(filter.date[0]);
    //     isCheckDate = job.createTime > startDate && job.createTime < endDate;
    //   }
    //   return job.name.includes(filter.name) && isCheckDate;
    // });
    const managerSalary = jobs.reduce(
      (accumulatorSalary: any, currentJob: any) => {
        accumulatorSalary[currentJob.idEmploy] =
          (accumulatorSalary[currentJob.idEmploy] || 0) +
          parseFloat(currentJob.customerPay) -
          currentJob.priceProduct * currentJob.quantityProduct;
        return accumulatorSalary;
      },
      {}
    );
    const receiveSalary = users.map((user: any) => {
      return {
        key: user.key,
        name: user.name,
        salary:
          managerSalary[user.key] - (managerSalary[user.key] * 20) / 100 + "$",
      };
    });
    return receiveSalary;
  }
);
export default remainingSalary;
