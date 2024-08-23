import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";

const AddTaxDialog = ({ open, handleClose, handleSave, formData, handleChange }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Tax</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          fullWidth
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <TextField
          margin="dense"
          label="Tax Type"
          select
          fullWidth
          value={formData.taxType}
          onChange={(e) => handleChange("taxType", e.target.value)}
          SelectProps={{ native: true }}
        >
          <option value="Fixed">Fixed</option>
          <option value="Percentage">Percentage</option>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaxDialog;
