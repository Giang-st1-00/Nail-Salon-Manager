import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
const userSelector = (state: RootState) => state.userSlice.dataUser;
// const filterJobSelector = (state: RootState) => state.productSlice.filter;
const remainingSalary = createSelector(
  userSelector,
  //   filterProductSelector,
  (users) => {
    const jobs = [
      {
        id: "1",
        idEmploy: "2",
        name: "Tinh",
        idProduct: "1",
        quantityProduct: 2,
        nameJob: "nail polish",
        description: "nail polish for customers",
        date: "6-10-2022",
        nameCustomer: "Messi",
        customerPay: 20,
        priceProduct: 5,
        colorProduct: "blue",
      },
      {
        id: "2",
        idEmploy: "1",
        name: "Tinh",
        idProduct: "1",
        quantityProduct: 1,
        nameJob: "nailolish",
        description: "nail polish for customers",
        date: "7-10-2022",
        nameCustomer: "Ronaldo",
        customerPay: 30,
        priceProduct: 3,
        colorProduct: "red",
      },
      {
        id: "3",
        idEmploy: "2",
        name: "giang",
        idProduct: "2",
        quantityProduct: 2,
        nameJob: "nailolish",
        description: "nail polish for customers",
        date: "8-10-2022",
        nameCustomer: "Neymar",
        customerPay: 40,
        priceProduct: 4,
        colorProduct: "red",
      },
    ];
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
