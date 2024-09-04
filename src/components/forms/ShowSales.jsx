// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import React from 'react';
// import "./SalesForm.css";
// import { useSelector } from 'react-redux';
// import { Button } from '@mui/material';

// const ShowSales = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  

//   let tableData = useSelector((state) => state.sales.tableData);


//   if (tableData.length === 0) {
//     const storedData = JSON.parse(localStorage.getItem("sales"));
//     if (storedData) {
//       tableData = storedData;
//     }
//   }

  
//   if (tableData.length === 0) {
//     return <div>No sales data available.</div>;
//   }
  
//   const overallTotalTax = tableData.reduce((acc, sale) => acc + sale.totalTax, 0);
//   const overallTotalPrice = tableData.reduce((acc, sale) => acc + sale.totalPrice, 0);

//   return (
//     <div className="sales-form">
//       <h2>Final Bill</h2>
//       <table className="sales-table">
//         <thead>
//           <tr>
//             <th>Invoice</th>
//             <th>Number of Products</th>
//             <th>Total Tax</th>
//             <th>Total Price</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tableData.map((sale, index) => (
//             <tr key={index}>
//               <td>{sale.invoice}</td>
//               <td>{sale.numberOfProducts}</td>
//               <td>{sale.totalTax.toFixed(2)}</td>
//               <td>{sale.totalPrice.toFixed(2)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="overall-totals">
//         <p>Overall Total Tax: {overallTotalTax.toFixed(2)}</p>
//         <p>Overall Total Price: {overallTotalPrice.toFixed(2)}</p>
//       </div>
//       <div className="add-button">
//         <center>
//           <Button
//             style={{ color: "white", fontSize: "10px" }}
//             onClick={() => navigate("/sale")}
//           >
//             Add More Products
//           </Button>
//         </center>
//       </div>
//     </div>
//   );
// };

// export default ShowSales;

// src/components/ShowSales.jsx

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import "./SalesForm.css";
import { loadSalesList } from "../../utils/localSotrage";
import { setSalesList } from "../../store/salesListSlice";
import { Button } from "@mui/material";

const ShowSales = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const salesList = useSelector((state) => state.salesList.salesList);

  useEffect(() => {
    // Load salesList from localStorage on component mount
    const storedSalesList = loadSalesList();
    if (storedSalesList.length > 0) {
      dispatch(setSalesList(storedSalesList));
    }
  }, [dispatch]);

  if (salesList.length === 0) {
    return <div>No sales data available.</div>;
  }

  const overallTotalTax = salesList.reduce(
    (acc, sale) => acc + sale.totalTax,
    0
  );
  const overallTotalPrice = salesList.reduce(
    (acc, sale) => acc + sale.totalPrice,
    0
  );

  return (
    <div className="sales-form">
      <h2>Final Bill</h2>
      <table className="sales-table">
        <thead>
          <tr>
            <th>Invoice</th>
            <th>Number of Products</th>
            <th>Total Tax</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {salesList.map((sale, index) => (
            <tr key={index}>
              <td>{sale.invoice}</td>
              <td>{sale.numberOfProducts}</td>
              <td>{sale.totalTax.toFixed(2)}</td>
              <td>{sale.totalPrice.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="overall-totals">
        <p>Overall Total Tax: {overallTotalTax.toFixed(2)}</p>
        <p>Overall Total Price: {overallTotalPrice.toFixed(2)}</p>
      </div>
      <div className="Add-button">
        <center>
          <Button
            style={{ color: "white", fontSize: "10px" }}
            onClick={() => navigate("/sale")}
          >
            Add More Products
          </Button>
        </center>
      </div>
    </div>
  );
};

export default ShowSales;




