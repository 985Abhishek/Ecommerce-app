import React, { useEffect, useState } from 'react';
import SalesForm from '../components/forms/SalesForm';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import './SalesPage.css';
import { fetchDataFromLocalStorage } from '../store/apiDataSlice';

const SalesPage = () => {
  const dispatch = useDispatch();

  // Access data from your localStorage (apiData slice)
  const { data = [], status = 'idle', error = null } = useSelector((state) => state.apiData || {});

  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch data from localStorage when the status is 'idle'
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDataFromLocalStorage());
    }
  }, [status, dispatch]);

  // Handle product selection from dropdown
  const handleProductSelect = (e) => {
    const productId = e.target.value;
    const product = data.find((product) => product.id === productId);
    setSelectedProduct(product);
  };

  let content;

  if (status === 'loading') {
    content = <p>Loading...</p>;
  } else if (status === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div className="sales">
      <h1>Sales Page</h1>

      <FormControl fullWidth>
        <InputLabel id="product-select-label">Select a Product</InputLabel>
        <Select
          labelId="product-select-label"
          id="product-select"
          value={selectedProduct?.id || ''}
          onChange={handleProductSelect}
        >
          {data.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedProduct ? (
        <SalesForm selectedProduct={selectedProduct} />
      ) : (
        <p>Please select a product to view details.</p>
      )}
    </div>
  );
};

export default SalesPage;
