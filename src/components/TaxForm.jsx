import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTax, deleteTax, editTax, setTaxes } from "../features/taxSlice";
import { updateField, resetForm } from "../features/taxDataSlice";
import { loadTaxes, saveTaxes } from "../utils/localSotrage";
import "./TaxForm.css";
import EditDi from "./EditDi";

import AddTaxDialog from "./Addtaxdialog";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteDialog from "./DeleteDialog";

const TaxForm = () => {
  const dispatch = useDispatch();
  const taxes = useSelector((state) => state.tax.taxes);
  const formData = useSelector(
    (state) => state.form || { name: "", description: "", taxType: "" }
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editingTax, setEditingTax] = useState(null);
  const [selectedTaxId, setSelectedTaxId] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Open Add Tax Dialog
  const handleOpenAddDialog = () => {
    dispatch(resetForm());
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    dispatch(resetForm());
  };

  const handleOpenDialog = (tax) => {
    setEditingTax(tax);
    dispatch(updateField({ field: "name", value: tax.name || "" }));
    dispatch(
      updateField({ field: "description", value: tax.description || "" })
    );
    dispatch(updateField({ field: "taxType", value: tax.taxType || "" }));
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingTax(null);
    dispatch(resetForm());
  };

  // Open and Close Delete Confirmation Dialog
  const handleOpenDeleteDialog = (id) => {
    setSelectedTaxId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedTaxId(null);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    dispatch(deleteTax({ id: selectedTaxId }));
    handleCloseDeleteDialog();
  };

  // const handleSaveChanges = () => {
  //   if (editingTax) {
  //     const updateData = {
  //       editingid = editingid.
  //     }
  //     dispatch(editTax({ id: editingTax, updatedData: formData }));
  //   }
  //   handleCloseDialog();
  // };
  const handleSaveChanges = () => {
    if (editingTax) {
      const updatedTax = {
        id: editingTax.id,
        ...formData,
      };
      dispatch(editTax(updatedTax)); // Dispatch editTax with updated data
      handleCloseDialog(); // Close the dialog after saving
    }
  };

  const handleInputChange = (field, value) => {
    dispatch(updateField({ field, value }));
  };
  console.log("formdata", formData);

  // const handleChange = (field, vlaue) => {
  //   dispatch(updateDialogue);
  // };

  // const handleAdd = () => {
  //   formData.name && formData.description;

  //   const newTax = {
  //     id: Date.now(),
  //     ...formData,
  //   };
  //   dispatch(addTax(newTax));
  // };

  const handleDelete = (id) => {
    dispatch(deleteTax({ id }));
  };

  const handleAddTax = () => {
    if (!formData.name || !formData.description || !formData.taxType) {
      alert("All fields must be filled!");
      return;
    }
    const newTax = {
      id: Date.now(),
      ...formData,
    };
    dispatch(addTax(newTax)); // Add the new tax to Redux state
    handleCloseAddDialog();
  };

  const handleEdit = (id) => {
    const updatedData = { ...formData };
    dispatch(editTax({ id, updatedData }));
  };

  useEffect(() => {
    const storedTaxes = loadTaxes();
    if (storedTaxes.length > 0) {
      dispatch(setTaxes(storedTaxes));
    }
  }, [dispatch]);

  useEffect(() => {
    saveTaxes(taxes);
  }, [taxes]);

  // Menu Handlers for Three Dots
  const handleMenuClick = (event, id) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedTaxId(id);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedTaxId(null);
  };
  return (
    <div className="form-container">
      <button className="add-tax-button" onClick={handleOpenAddDialog}>
        Add Tax
      </button>

      <table className="tax-table">
        <thead>
          <tr>
            <th>serial Number</th>
            <th>Name</th>
            <th>Description</th>
            <th>Tax Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {taxes.map((tax, index) => (
            <tr key={tax.id}>
              <td>{index + 1}</td>
              <td>{tax.name}</td>
              <td>{tax.description}</td>
              <td>{tax.taxType}</td>
              <td>
                <IconButton onClick={(event) => handleMenuClick(event, tax.id)}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={menuAnchorEl}
                  open={Boolean(menuAnchorEl) && selectedTaxId === tax.id}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    onClick={() => {
                      handleOpenDialog(tax);
                      handleMenuClose();
                    }}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleOpenDeleteDialog(tax.id);
                      handleMenuClose();
                    }}
                  >
                    Delete
                  </MenuItem>
                </Menu>
              </td>
              {/* <td>
                <button
                  style={{ width: "50%", backgroundColor: "GrayText" }}
                  onClick={() => handleOpenDialog(tax)}
                >
                  Edit
                </button>{" "}
                <button
                  style={{ width: "50%" }}
                  onClick={() => handleDelete(tax.id)}
                >
                  Delete
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <AddTaxDialog
        open={addDialogOpen}
        handleClose={handleCloseAddDialog}
        handleSave={handleAddTax}
        formData={formData}
        handleChange={(field, value) => dispatch(updateField({ field, value }))}
      />

      {/* <div className="form-controls">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
        <select
          value={formData.taxType || "Fixed"}
          onChange={(e) => handleInputChange("taxType", e.target.value)}
        >
          <option value="">Fixed</option>
          <option value="Percentage">Percentage</option>
        </select>
        <button onClick={handleAdd}>Add Tax</button>
      </div> */}

      <EditDi
        open={dialogOpen}
        handleClose={handleCloseDialog}
        handleSave={handleSaveChanges}
        formData={formData}
        handleChange={handleInputChange}
        edit={handleEdit}
      />
<DeleteDialog
open ={deleteDialogOpen}
handleCloseDeleteDialog = {handleCloseDeleteDialog}
handleConfirmDelete = {handleConfirmDelete}



></DeleteDialog>

    </div>
  );
};

export default TaxForm;
