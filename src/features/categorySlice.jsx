import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    editCategory: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.categories.findIndex((cat) => cat.id === id);
      if (index !== -1) {
        state.categories[index] = {
          ...state.categories[index],
          ...updatedData,
        };
      }
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { addCategory, deleteCategory, editCategory, setCategories } =
  categorySlice.actions;
export default categorySlice.reducer;
