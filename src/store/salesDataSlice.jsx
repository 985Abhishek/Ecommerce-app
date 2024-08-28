import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tableData: {
    name: "",
    price: 0,
    quantity: 1, // Default quantity is 1
    totalTax: 0,
    totalPrice: 0,
  },
};

const salesDataSlice = createSlice({
  name: "salesData",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state.tableData[field] = value;
      if (field === "quantity") {
        state.tableData.totalTax = state.tableData.price * value * 0.05; // Recalculate total tax assuming 5% tax
      }
      state.tableData.totalPrice = state.tableData.price + state.tableData.totalTax;
    },
    resetForm: (state) => {
      state.tableData = initialState.tableData;
    },
  },
});

export const { updateField, resetForm } = salesDataSlice.actions;
export default salesDataSlice.reducer;
