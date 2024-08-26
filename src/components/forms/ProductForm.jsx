import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { resetProductForm, updateProductField } from '../../store/productDataSlice';
import { addProduct, editproduct, setproducts } from '../../store/productSlice';
import { IconButton, Menu, MenuItem, Pagination } from '@mui/material';
import AddProductsdialog from '../dialogs/AddProductsdialog';
import EditProductDialog from '../dialogs/EditProductDialog';
import Deleteproductdialog from '../dialogs/Deleteproductdialog';
import { loadProducts, saveProducts } from '../../utils/localSotrage';

const ProductForm = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product?.products ||  []);


  console.log("products",products)
  
  
  const productData = useSelector((state) => state.productData || {
    name: '',
    description: '',
    product: '',
    stockquantity: '',
    price: '',
    category: '',
    tax:'',
  });
  const [currentProductPage, setcurrentProductPage]= useState(1)
  const [addProductDiologOpen, setAddProductDialogOpen] = useState(false)
  const [editingproduct, seteditingproduct] = useState(null);
  const [editingDialogopen,seteditingDialogopen ] = useState(false)
  const [deleteProductDialogOpen, setDeleteProductDialogOpen] = useState(false);
  const [selectedProductId, setselectedProductId]=useState(null)
  const [menuProductAnchorEl, setmenuProductAnchorEl] = useState(false)

  const recordsPerPage = 10;
  
   const totalProducts = Math.ceil(products.length /recordsPerPage);

   const paginatedProducts = products.slice((currentProductPage-1)* recordsPerPage, currentProductPage * recordsPerPage);

   //to open add product dialog box
 const handleOpenAddProductDialog = ()=>{
  dispatch(resetProductForm());
  setAddProductDialogOpen(true);
 };

 const handleCloseAddProductDialog = ()=>{
setAddProductDialogOpen(false);
dispatch(resetProductForm());
 };
//to open and close editing dialog box
 const handleOpenEditingProductDialog = (product)=>{
  seteditingproduct(product);
dispatch(updateProductField({field : "name", value: product.name || ""}))
dispatch(updateProductField({field : "description", value: product.description || ""}))
dispatch(updateProductField({field : "productid", value: product.product.id || ""}))
dispatch(updateProductField({field : "stock quantity", value: product.stockquantity || ""}))
dispatch(updateProductField({field : "category", value: product.category.id || ""}))
dispatch(updateProductField({field : "tax", value: product.tax.id || ""}))
 };

 const handleCloseEditingProductDialog = ()=>{
  seteditingproduct(null);
  seteditingDialogopen(false);
  dispatch(resetProductForm())
 };
// to handle delete dialog
 const handleOpenProductDeleteDialog = (id)=>{
  setselectedProductId(id);
  setDeleteDialogOpen(true);
 }

 const  handleCloseProductDeleteDialog = ()=>{
  setDeleteProductDialogOpen(false);
  setselectedProductId(null);
 }

 const handleConfirmProductDelete =()=>{
dispatch(deleteproduct({id: selectedProductId}));
handleCloseProductDeleteDialog()
 }

 const handleProductSaveChanges = ()=> {
  if(editingproduct) {
    const  updatedProduct = {
      id: editingproduct.product.id,
      name: editingproduct.name,
      description: editingproduct.description,
      product: editingproduct.product,
      stockquantity: editingproduct.stockquantity,
      price: editingproduct.price,
      category: editingproduct.category,
      tax: editingproduct.tax,
    };
    dispatch(editproduct(updatedProduct));
    handleCloseEditingProductDialog();

  }
 }

 const handleInputProductChange = (field, value) => {
  dispatch(updateProductField({ field, value }))
 }
 const handleProductDelete = (id) => {
  dispatch(deleteProduct(id));
 }

 const handleAddProduct =() =>{
  if( 
    ! productData.name ||
    ! productData.description ||
    ! productData.productid ||
    ! productData.stockquantity ||
    ! productData.category ||
    ! productData.tax
  ) {
    alert("All fields must be filled");
    return;

    const newProduct ={
      id:Date.now(),
      ...productData,

    }
    dispatch(addProduct(newProduct))
    handleCloseAddProductDialog
  }
 }

 const handleproductPageChange = (event, value)=>{
  setcurrentProductPage(value);
 }

 const handleproductEdit = (id) =>{
  const updatedProduct = {...productData };
  dispatch(editproduct({id, updatedProduct}));
 };
 // ---------------------------LOCALSOTRAGE CODE -------------------------------
 useEffect(() => {
  const storedProducts = loadProducts();
  if (storedProducts.length > 0) {
    dispatch(setproducts(storedProducts));
  }
}, [dispatch]);

useEffect(() => {
  saveProducts(products);
}, [products]);
 
 // MENU HANDLER FOR THREE DOTS
 const handleProductMenuClick = (event, id) => {
setmenuProductAnchorEl(event.currentTarget);
setselectedProductId(id);
 };

 const handleproductMenuClose =()=> {
setmenuProductAnchorEl(null);
setselectedProductId(null);
 }
 
 const handleProductMenuClose =()=>{
  dispatch(toggle)

 }
  return (
    <div>
       <button className="add-tax-button" onClick={handleOpenAddProductDialog}>
        Add Product
      </button>
      <table className="tax-table">
        <thead>
          <tr>
            <th>serial Number</th>
            <th>Name</th>
            <th>Description</th>
            <th>Product Id</th>
            <th>Stock Quantity</th>
            <th>Price</th>
            <th>Category</th>
            <th>Tax</th>
           
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product, index) => (
            <tr key={tax.id}>
              <td>{ (currentPage -1)* recordsPerPage + index + 1}</td>
              <td>{products.name}</td>
              <td>{products.description}</td>
              <td>{products.Product}</td>
              <td>{products.stockquantity}</td>
              <td>{products.Price}</td> 
              <td>{products.Category}</td> 
              <td>{products.Tax}</td> 

              <td>
                <IconButton onClick={(event) => handleProductMenuClick(event, product.id)}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={menuProductAnchorEl}
                  open={Boolean(menuProductAnchorEl) && selectedProductId === product.id}
                  onClose={handleProductMenuClose}
                >
                  <MenuItem
                    onClick={() => {
                      handleProductMenuClose();
                      handleOpenEditingProductDialog(tax);
                    }}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleProductMenuClose();
                      handleOpenProductDeleteDialog(product.id);
                    }}
                  >
                    Delete
                  </MenuItem>
                </Menu>
              </td>
              </tr>
          ))}
        </tbody>
      </table>
      <Pagination  count={Math.ceil(products.length / recordsPerPage)}
        page={currentProductPage}
        onChange={handleproductPageChange}
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton />
        
        <AddProductsdialog>
        open={addProductDiologOpen}
        handleProductClose={handleCloseAddProductDialog}
        handleProductSave={handleAddProduct}
        productData ={productData}
        handleProductChange={(field, value) => dispatch(updateProductField({ field, value }))}
        {/* handleProduct={handleTaxCaluclation} */}
        </AddProductsdialog>

        <EditProductDialog>
        open={addProductDiologOpen}
        handleProductClose={handleCloseAddProductDialog}
        handleProductSave={handleProductSaveChanges}
        product={products}
        handleProductChange={handleInputProductChange}
        edit={handleproductEdit}
        </EditProductDialog>

<Deleteproductdialog>
open={deleteProductDialogOpen}
        handleCloseProductDeleteDialog={handleCloseProductDeleteDialog}
        handleConfirmProductDelete={handleConfirmProductDelete}
</Deleteproductdialog>
             
              
              
    </div>
  )
}



export default ProductForm
