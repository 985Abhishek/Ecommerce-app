import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, calculateTotals } from "../../store/salesSlice";
import "./SalesForm.css";
import { loadSales, saveSales } from "../../utils/localSotrage";

const SalesForm = ({ selectedProduct }) => {
  const dispatch = useDispatch();
 const tableData = useSelector((state) => state.sales.tableData);

  const [productData, setProductData] = useState({
    id: selectedProduct?.id || "",
    name: selectedProduct?.name || "",
    quantity: 1,
    amount: selectedProduct?.Amount || 100,
    tax: (selectedProduct?.Amount || 100) * 0.05,
    totalPrice: (selectedProduct?.Amount || 100) + (selectedProduct?.Amount || 0) * 0.05,
  });


  useEffect(() => {
    if (selectedProduct) {
      const initialData = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        quantity: 1,
        amount: selectedProduct.Amount || 100,
        tax: (selectedProduct.Amount || 100) * 0.05,
        totalPrice: (selectedProduct.Amount || 100) + (selectedProduct.Amount || 0) * 0.05,
      };

      setProductData(initialData);
      dispatch(updateQuantity(initialData));
      dispatch(calculateTotals());
    }
  }, [selectedProduct, dispatch]);

  const handleQuantityChange = (id, newQuantity) => {
    const updatedData = {
      ...productData,
      quantity: newQuantity,
      tax: productData.amount * 0.05 * newQuantity,
      totalPrice: productData.amount * newQuantity + productData.amount * 0.05 * newQuantity,
    };

    setProductData(updatedData);
    dispatch(updateQuantity(updatedData));
    dispatch(calculateTotals());
  };

  if (!selectedProduct) {
    return <div>Please select a product.</div>;
  }

  return (
    <div lkey ={selectedProduct?.id}className ="sales-form">
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
          <tr key={productData.id}>
            <td>{productData.name}</td>
            <td>{productData.amount.toFixed(2)}</td>
            <td>
              <div className="quantity-counter">
                <button
                  onClick={() =>
                    handleQuantityChange(productData.id, Math.max(productData.quantity - 1, 1))
                  }
                >
                  -
                </button>
                <span>{productData.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(productData.id, productData.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
            </td>
            <td>{productData.tax.toFixed(2)}</td>
            <td>{productData.totalPrice.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <div className="totals">
        <p>Total Tax: {productData.tax.toFixed(2)}</p>
        <p>Total Price: {productData.totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default SalesForm;
