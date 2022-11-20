import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProduct, IFilter } from "../../../model";
import { editJob } from "../job";
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
      price: 5,
      importQuantity: 5,
      exportQuantity: 0,
      remainingQuantity: 5,
      color: "red",
      createTime: new Date("2022-03-25"),
    },
    {
      key: "2",
      name: "Bấm móng chân",
      price: 4,
      importQuantity: 3,
      exportQuantity: 0,
      remainingQuantity: 3,
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
      state.dataProduct[indexAddProduct].importQuantity +=
        action.payload.quantity;
      state.dataProduct[indexAddProduct].remainingQuantity +=
        action.payload.quantity;
    },
    useProduct: (
      state,
      action: PayloadAction<{ keyProduct: string; countQuantityEdit: number }>
    ) => {
      const indexAddProduct = state.dataProduct.findIndex(
        (Product) => Product.key === action.payload.keyProduct
      );
      state.dataProduct[indexAddProduct].exportQuantity +=
        action.payload.countQuantityEdit;
      state.dataProduct[indexAddProduct].remainingQuantity -=
        action.payload.countQuantityEdit;
    },

    changeStatus: (state, action: PayloadAction<IFilter>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editJob, (state, action) => {
        const indexAddProduct = state.dataProduct.findIndex(
          (Product) => Product.key === action.payload.idProduct
        );
        state.dataProduct[indexAddProduct].exportQuantity +=
          action.payload.countQuantityEdit;
        state.dataProduct[indexAddProduct].remainingQuantity -=
          action.payload.countQuantityEdit;
      })
      .addDefaultCase((state, action) => {});
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
  useProduct,
} = productSlice.actions;
