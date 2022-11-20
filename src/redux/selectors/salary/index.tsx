import { createSelector } from "@reduxjs/toolkit";
import { IJob, IUser } from "../../../model";
import { RootState } from "../../store";
const userSelector = (state: RootState) => state.userSlice.dataUser;
const jobSelector = (state: RootState) => state.jobSlice.dataJob;

const filterJobSelector = (state: RootState) => state.salarySlice.filter;
const remainingSalary = createSelector(
  userSelector,
  jobSelector,
  filterJobSelector,
  (users, jobs, filter) => {
    const filterJob = jobs.filter((job) => {
      let isCheckDate = true;
      if (filter.date[0] && filter.date[1]) {
        const endDate = new Date(filter.date[1]);
        const startDate = new Date(filter.date[0]);
        isCheckDate = job.time > startDate && job.time < endDate;
      }
      return job.nameEmployee.includes(filter.name) && isCheckDate;
    });
    const managerSalary: any = filterJob.reduce(
      (accumulatorSalary: any, currentJob: IJob) => {
        accumulatorSalary[currentJob.idEmployee] =
          (accumulatorSalary[currentJob.idEmployee] || 0) +
          currentJob.customerPay -
          currentJob.priceProduct * currentJob.quantityProduct;
        return accumulatorSalary;
      },
      {}
    );

    const receiveSalary: any = users.map((user: IUser) => {
      return {
        key: user.key,
        name: user.name,
        salary: managerSalary[user.key] - (managerSalary[user.key] * 20) / 100,
      };
    });
    const remainingSalary = receiveSalary.filter(
      (item: { key: string; name: string; salary: number }) => {
        return item.salary;
      }
    );
    return remainingSalary;
  }
);
export default remainingSalary;
