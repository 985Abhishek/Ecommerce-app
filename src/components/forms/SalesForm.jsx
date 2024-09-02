
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import "./SalesForm.css";
import { saveSales, loadSales } from "../../utils/localSotrage";
import { setSales } from "../../store/salesSlice";
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';


const SalesForm = ({ selectedProducts }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tableData = useSelector((state) => state.sales.tableData);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const storedSales = loadSales();
    if (storedSales.length > 0) {
      dispatch(setSales(storedSales));
    }
  }, [dispatch]);

  useEffect(() => {
    const newProducts = selectedProducts.map((product) => ({
      id: product.id,
      name: product.name,
      quantity: 1,
      amount: product.Amount || 2500,
      tax: (product.Amount || 2500) * 0.10,
      totalPrice: (product.Amount || 2500) + (product.Amount || 2500) * 0.10,
    }));
    setProductData(newProducts);
  }, [selectedProducts]);

  const handleQuantityChange = (id, newQuantity) => {
    setProductData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQuantity,
              tax: item.amount * 0.10 * newQuantity,
              totalPrice: item.amount * newQuantity + item.amount * 0.10 * newQuantity,
            }
          : item
      )
    );
  };

  const navigateToShowSales = () => {
    const invoice =Date.now();
    const totalTax = productData.reduce((acc, item) => acc + item.tax, 0);
    const totalPrice = productData.reduce((acc, item) => acc + item.totalPrice, 0);

    const newSale = {
      invoice,
      numberOfProducts: productData.length,
      totalTax,
      totalPrice
    };

    console.log("New Sale Data:", newSale); // Debug log

    const updatedSales = [...tableData, newSale];
    dispatch(setSales(updatedSales));
    saveSales(updatedSales);

    console.log("Updated Sales Data:", updatedSales); // Debug log

    navigate('/showsale');
  };

  if (productData.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <div className="sales-form">
      <table className="sales-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Quantity</th>
            <th>Total Tax</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {productData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.amount.toFixed(2)}</td>
              <td>
                <div className="quantity-counter">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, Math.max(item.quantity - 1, 1))
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </td>
              <td>{item.tax.toFixed(2)}</td>
              <td>{item.totalPrice.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="totals">
        <p>Total Tax: {productData.reduce((acc, item) => acc + item.tax, 0).toFixed(2)}</p>
        <p>Total Price: {productData.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2)}</p>
      </div>
      <div className="submit-button">
        <Button onClick={navigateToShowSales} variant="contained">Submit</Button>
      </div>
    </div>
  );
};

export default SalesForm;

