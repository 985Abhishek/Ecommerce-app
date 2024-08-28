// import { configureStore } from "@reduxjs/toolkit";
//  import categoryReducer from "../store/categorySlice";
//  import taxReducer, { fetchTaxes } from "../store/taxSlice";
// import taxReducer from "../store/taxSlice";
// import taxDataReducer from "../store/taxDataSlice";
// import dialogReducer from "../store/dialogSlice";
// import productReducer from "../store/productSlice";
// import productDataReducer from "../store/productDataSlice";

// export const store = configureStore({
//   reducer: {
//     category: categoryReducer,
//     tax: taxReducer,
//     form: taxDataReducer,
//     dialog: dialogReducer,
//     product: productReducer,
//     productData : productDataReducer,
//     fetchCategories: fetchCategories,
//     fetchTaxes : fetchTaxes
//      // Add this to the store
//   },
// });

// export default store;

// store.js
import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../store/categorySlice";
import  taxReducer from "../store/taxSlice";
import taxDataReducer from "../store/taxDataSlice";
import dialogReducer from "../store/dialogSlice";
import productReducer from "../store/productSlice";
import productDataReducer from "../store/productDataSlice";
import apiDataReducer from "../store/apiDataSlice";
import salesDataReducer from "../store/salesDataSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    tax: taxReducer,
    form: taxDataReducer,
    dialog: dialogReducer,
    product: productReducer,
    productData: productDataReducer,
    // fetchTaxes : fetchTaxes
    apiData : apiDataReducer,
    salesData: salesDataReducer,
  },
});

export default store;
