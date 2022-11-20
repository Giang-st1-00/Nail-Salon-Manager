import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
const productSelector = (state: RootState) => state.productSlice.dataProduct;
const filterProductSelector = (state: RootState) => state.productSlice.filter;
const remainingProduct = createSelector(
  productSelector,
  filterProductSelector,
  (products, filter) => {
    const remainingProduct = products.filter((product) => {
      let isCheckDate = true;
      if (filter.date[0] && filter.date[1]) {
        const endDate = new Date(filter.date[1]);
        const startDate = new Date(filter.date[0]);
        isCheckDate =
          product.createTime > startDate && product.createTime < endDate;
      }
      return product.name.includes(filter.name) && isCheckDate;
    });
    return remainingProduct;
  }
);
export default remainingProduct;
