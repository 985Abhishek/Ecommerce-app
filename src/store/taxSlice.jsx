import { createSlice } from "@reduxjs/toolkit";

export const taxSlice = createSlice({
  name: "tax",
  initialState: { taxes: [] },

  reducers: {
    addTax: (state, action) => {
      state.taxes.push(action.payload);
    },
    deleteTax: (state, action) => {
      state.taxes = state.taxes.filter((tax) => tax.id !== action.payload.id);
    },
    editTax: (state, action) => {
      const { id } = action.payload;
      const index = state.taxes.findIndex((tax) => tax.id === id);
      if (index !== -1) {
        state.taxes[index] = action.payload;
      }
    },
    setTaxes: (state, action) => {
      state.taxes = action.payload;
    },
  },
});

export const { addTax, deleteTax, editTax, setTaxes } = taxSlice.actions;
export default taxSlice.reducer;
