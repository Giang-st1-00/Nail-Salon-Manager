import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  filter: {
    name: "",
    date: ["", ""],
  },
  dataJob: [
    {
      id: 1,
      idEmploy: 1,
      name: "Duy Tinh",
      idProduct: 1,
      quantityProduct: 2,
      nameJob: "nail polish",
      description: "nail polish for customers",
      createTime: new Date("2022-06-01"),
      nameCustomer: "Messi",
      customerPay: 20,
      priceProduct: 5,
      colorProduct: "red",
    },
    {
      id: 2,
      idEmploy: 1,
      name: "Duy Tinh",
      idProduct: 1,
      quantityProduct: 1,
      nameJob: "nailolish",
      description: "nail polish for customers",
      createTime: new Date("2022-09-03"),
      nameCustomer: "Ronaldo",
      customerPay: 30,
      priceProduct: 5,
      colorProduct: "red",
    },
    {
      id: 3,
      idEmploy: 2,
      name: "Giang",
      idProduct: 2,
      quantityProduct: 2,
      nameJob: "nailolish",
      description: "nail polish for customers",
      createTime: new Date("2022-03-25"),
      nameCustomer: "Neymar",
      customerPay: 40,
      priceProduct: 4,
      colorProduct: "red",
    },
  ],
};
const jobSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});
export default jobSlice.reducer;
