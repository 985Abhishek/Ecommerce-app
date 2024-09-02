import { useDispatch } from 'react-redux';
import React from 'react';
import "./SalesForm.css";
import { useSelector } from 'react-redux';
import { loadShowSales, saveShowSales } from '../../utils/localSotrage';

const ShowSales = () => {
  let tableData = useSelector((state) => state.sales.tableData);
  const dispatch = useDispatch();

 console.log("Sales data in before ShowSales:", tableData); 

  if (tableData.length === 0) {
        const storedData = JSON.parse(localStorage.getItem("sales"));
        if (storedData) {
           tableData = storedData;
        }
      }
  if (tableData.length === 0) {
    return <div>No sales data available.</div>;
  }console.log("sales Data", tableData)
  
  console.log("Sales data in after ShowSales:", tableData);
  
  const overallTotalTax = tableData.reduce((acc, sale) => acc + sale.totalTax, 0);
  const overallTotalPrice = tableData.reduce((acc, sale) => acc + sale.totalPrice, 0);

  return (
    <div className="sales-form">
      <h2>Sales Summary</h2>
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
          {tableData.map((sale, index) => (
            <tr key={index}>
              <td>{sale.invoice}</td>
              <td>{sale.numberOfProducts}</td>
              <td>{sale.totalTax.toFixed()    }</td>
              <td>{sale.totalPrice.toFixed()  }</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="overall-totals">
        <p>Overall Total Tax: {overallTotalTax.toFixed(2) }</p>
        <p>Overall Total Price: {overallTotalPrice.toFixed(2) }</p>
      </div>
      <div className="submit-button">
      </div>
    </div>
  );
};

export default ShowSales;

