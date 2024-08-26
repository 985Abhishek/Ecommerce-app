import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../store/categorySlice";
import taxReducer from "../store/taxSlice";
import taxDataReducer from "../store/taxDataSlice";
import dialogReducer from "../store/dialogSlice";
import productReducer from "../store/productSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    tax: taxReducer,
    form: taxDataReducer,
    dialog: dialogReducer,
    product: productReducer, // Add this to the store
  },
});

export default store;
