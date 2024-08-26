import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";

const AddProductsdialog = ({ open, handleProductClose, handleProductSave,handleProductChange, productData, handleProduct }) => {

  const handleSaveClick = () => {
    // if (formData.amount && formData.taxType) {
    //   const id =formData.id || Date.now();
    //   handleTax(formData.id, formData.taxType);
    // }
    handleProductSave();
  };

  return (
    <Dialog open={open} onClose={handleProductClose}>
      <DialogTitle>Add Products</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          fullWidth
          value={productData.name}
          onChange={(e) => handleProductChange("name", e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          value={productData.description}
          onChange={(e) => handleProductChange("description", e.target.value)}
        />
        
        <TextField
          margin="dense"
          label=""
          select
          fullWidth
          value={productData.product.id}
          onChange={(e) => handleProductChange("taxType", e.target.value)}
          SelectProps={{ native: true }}
        >
        </TextField>
        <TextField
          margin="dense"
          label="amount"
          fullWidth
          value={productData.stackquantity}
          onChange={(e) => handleProductChange("amount", e.target.value)}
        />
        <TextField
          margin="dense"
          label="amount"
          fullWidth
          value={productData.price}
          onChange={(e) => handleProductChange("amount", e.target.value)}
        />
        <TextField
          margin="dense"
          label="amount"
          fullWidth
          value={productData.category}
          onChange={(e) => handleProductChange("amount", e.target.value)}
        />
        <TextField
          margin="dense"
          label="amount"
          fullWidth
          value={productData.tax}
          onChange={(e) => handleProductChange("amount", e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button style ={{color:"white", backgroundColor:"red"}}onClick={handleProductClose}>Cancel</Button>
        <Button style ={{color:"white", backgroundColor:"green"}} onClick={handleProductSave } >Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductsdialog;
