import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../store/salesDataSlice";
import { Button } from "@mui/material";

const SalesForm = () => {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.salesData.tableData || []);
  const [selectedProduct, setSelectedProduct] =  useState(null);
  useEffect(() => {
    if (selectedProduct) {
      dispatch(updateField({ field: "name", value: selectedProduct.name }));
      dispatch(updateField({ field: "price", value: selectedProduct.price }));
      dispatch(updateField({ field: "totalTax", value: selectedProduct.price * 0.05 })); // Assuming 5% tax
      dispatch(updateField({ field: "totalPrice", value: selectedProduct.price + selectedProduct.price * 0.05 }));
    } else {
      dispatch(resetForm());
    }
  }, [selectedProduct, dispatch]);
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleInputChange = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const handleQuantityChange = (change) => {
    const newQuantity = tableData.quantity + change;
    if (newQuantity > 0) {
      handleInputChange("quantity", newQuantity);
    }
  };

  return (
    <div className="sales-form">
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={tableData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={tableData.price}
          onChange={(e) => handleInputChange("price", parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Quantity:</label>
        <Button onClick={() => handleQuantityChange(-1)}>-</Button>
        <span>{tableData.quantity}</span>
        <Button onClick={() => handleQuantityChange(1)}>+</Button>
      </div>
      <div>
        <label>Total Tax:</label>
        <span>{tableData.totalTax.toFixed(2)}</span>
      </div>
      <div>
        <label>Total Price:</label>
        <span>{tableData.totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default SalesForm;
