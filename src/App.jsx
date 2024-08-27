import React from "react";
import Sidebar from "./components/Sidebar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import TaxPage from "./pages/TaxPage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import { ToastContainer } from "react-toastify";


function App() {
  return (

    <div className="app-container">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/tax" element={<TaxPage />} />
         
          <Route path="/product" element={<ProductPage />} />
         
          <Route path="*" element={<CategoryPage />} />
        </Routes>
      </div>
    </div>
    
  );
}

export default App;
