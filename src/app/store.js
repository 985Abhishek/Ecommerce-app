import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/categorySlice";
import taxReducer from "../features/taxSlice";
import taxDataReducer from "../features/taxDataSlice";
import dialogReducer from "../features/dialogSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    tax: taxReducer,
    form: taxDataReducer,
    dialog: dialogReducer,
  },
});

export default store;
