import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const EditDi = ({ open, handleClose, handleSave, formData, handleChange, edit }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Details</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          field= "name"
          fullWidth
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          field = "description"
          fullWidth
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        {formData.taxType !== undefined && (
          <TextField
            margin="dense"
            label="Tax Type"
            select
            fullWidth
            value={formData.taxType}
            onChange={(e) => handleChange("taxType", e.target.value)}
            SelectProps={{
              native: true,
            }}
          >
            <option value="Fixed">Fixed</option>
            <option value="Percentage">Percentage</option>
          </TextField>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDi;
