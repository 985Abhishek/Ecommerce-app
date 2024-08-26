import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const EditProductDialog = ({open, handleProductChange, handleProductSave, product,  handleProductClose}) => {

  return (
    <div>
       <Dialog open={open} onClose={handleProductClose}>
      <DialogTitle>Edit Product Details</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          field= "name"
          fullWidth
          value={product.name}
          onChange={(e) => handleProductChange("name", e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          field = "description"
          fullWidth
          value={product.description}
          onChange={(e) => handleProductChange("description", e.target.value)}
        />
        <TextField
          margin="dense"
          label="Productid"
          field = "Productid"
          fullWidth
          value={product.product.id}
          onChange={(e) => handleProductChange("Productid", e.target.value)}
        />
        <TextField
          margin="dense"
          label="stockquantity"
          field = "stockquantity"
          fullWidth
          value={product.stockquantity}
          onChange={(e) => handleProductChange("stockquantity", e.target.value)}
        />
        <TextField
          margin="dense"
          label="price"
          field = "price"
          fullWidth
          value={product.price}
          onChange={(e) => handleProductChange("price", e.target.value)}
        />
        <TextField
          margin="dense"
          label="category"
          field = "category"
          fullWidth
          value={product.category}
          onChange={(e) => handleProductChange("category", e.target.value)}
        />
        <TextField
          margin="dense"
          label="tax"
          field = "tax"
          fullWidth
          value={product.tax}
          onChange={(e) => handleProductChange("tax", e.target.value)}
        />
         </DialogContent>
      <DialogActions>
        <Button  style ={{backgroundColor:"red", color:"white"}}onClick={handleProductClose} color="primary">
          Cancel
        </Button>
        <Button style ={{backgroundColor:"green", color:"white"}} onClick={handleProductSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
      
    </div>
  )
}

export default EditProductDialog
