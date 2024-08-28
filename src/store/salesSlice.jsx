import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useLocation } from "react-router-dom";

const initialState = {
  sales: [],

};

export const salesSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {
    addSales: (state, action) => {
      state.taxes.push(action.payload);
    },
    deleteSales: (state, action) => {
      state.taxes = state.taxes.filter((tax) => tax.id !== action.payload.id);
    },
    editSales: (state, action) => {
      const { id } = action.payload;
      const index = state.taxes.findIndex((tax) => tax.id === id);
      if (index !== -1) {
        state.taxes[index] = action.payload;
      }
    },
    setSales: (state, action) => {
      state.taxes = action.payload;
    },
  },
});

export const { addSales, deleteSales, editSales, setSales } = salesSlice.actions;
export default salesSlice.reducer;
