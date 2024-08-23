import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
  name: "",
  description: "",
  taxType: "",
};

export const taxDataSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: (state) => {
      state.name = "";
      state.description = "";
      state.taxType = "";
    },
  },
});

// Memoized selector to prevent new references
// const selectTaxData = (state) => state.tax;
// export const selectMemoizedTaxData = createSelector(
//   [selectTaxData],
//   (taxData) => taxData
// );

//  const selectMemoizedTaxData = createSelector(
//   (state) => state.taxData,
//   (taxData) => ({
//     name: taxData.name,
//     description: taxData.description,
//     taxType: taxData.taxType,
//   })
// );

export const { updateField, resetForm } = taxDataSlice.actions;
// export { selectMemoizedTaxData };
export default taxDataSlice.reducer;
