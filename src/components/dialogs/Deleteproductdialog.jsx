import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from "@mui/material";
  

const Deleteproductdialog = ({open, handlecloseProductDeleteDialog,handleConfirmProductDelete}) => {
  return (
    <div>
        <Dialog open={open} onClose={handlecloseProductDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style ={{color:"white", backgroundColor:"red"}} onClick={handlecloseProductDeleteDialog}>Cancel</Button>
          <Button style ={{color:"white", backgroundColor:"green"}} onClick={handleConfirmProductDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Deleteproductdialog
