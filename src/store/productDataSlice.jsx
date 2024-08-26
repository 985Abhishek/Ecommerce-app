import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  description: "",
  proudct: {
    id: "",
  },
  stockquantity: "",
  price: "",
  category: {
    id: "",
  },
  tax: {
    id: "",
  },
};

export const productDataSlice = createSlice({
  name: "productData",
  initialState,
  reducers: {
    updateProductField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetProductForm: (state, action) => {
      state.name = "";
      state.description = "";
      state.proudct.id = "";
      state.stockquantity = "";
      state.price = "";
      state.category.id = "";
      state.tax.id = "";
    },
  },
});

export const { updateProductField, resetProductForm } =
  productDataSlice.actions;

export default productDataSlice.reducer;
