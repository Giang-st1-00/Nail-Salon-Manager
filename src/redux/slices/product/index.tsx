import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProduct, IFilter } from "../../../model";

type TProductState = {
  filter: {
    name: string;
    date: Array<string>;
  };
  dataProduct: Array<IProduct>;
};
const initialState: TProductState = {
  filter: {
    name: "",
    date: ["", ""],
  },
  dataProduct: [
    {
      key: "1",
      name: "Bấm móng tay",
      price: 12,
      quantity: 4,
      color: "red",
      createTime: new Date("2022-03-25"),
    },
    {
      key: "2",
      name: "Bấm móng chân",
      price: 10,
      quantity: 3,
      color: "red",
      createTime: new Date("2022-12-03"),
    },
  ],
};
const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.dataProduct.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.dataProduct = state.dataProduct.filter(
        (Product) => Product.key !== action.payload
      );
    },
    deleteListProduct: (state, action: PayloadAction<React.Key[]>) => {
      state.dataProduct = state.dataProduct.filter(
        (Product) => !action.payload.includes(Product.key)
      );
    },
    editProduct: (state, action: PayloadAction<IProduct>) => {
      const indexEditProduct = state.dataProduct.findIndex(
        (Product) => Product.key === action.payload.key
      );
      state.dataProduct[indexEditProduct] = action.payload;
    },
    addExistProduct: (
      state,
      action: PayloadAction<{ key: string; quantity: number }>
    ) => {
      const indexAddProduct = state.dataProduct.findIndex(
        (Product) => Product.key === action.payload.key
      );
      state.dataProduct[indexAddProduct].quantity += action.payload.quantity;
    },
    changeStatus: (state, action: PayloadAction<IFilter>) => {
      state.filter = action.payload;
    },
  },
});
export default productSlice.reducer;
export const {
  addProduct,
  deleteProduct,
  deleteListProduct,
  editProduct,
  addExistProduct,
  changeStatus,
} = productSlice.actions;
