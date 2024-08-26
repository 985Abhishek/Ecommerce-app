import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../store/categorySlice";
import taxReducer from "../store/taxSlice";
import taxDataReducer from "../store/taxDataSlice";
import dialogReducer from "../store/dialogSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    tax: taxReducer,
    form: taxDataReducer,
    dialog: dialogReducer,
  },
});

export default store;
