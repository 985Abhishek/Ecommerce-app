import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name:'product',
    initialState: {
    products: [],
},
reducers:{
    addProduct: (state, action)=>{
        state.products.push(action.payload)
    },
    deleteproduct : (state, action)=>{
        state.products = state.products.filter((product)=>product.id !== action.payload.id)
    },
    editproduct : (state, action) =>{
        const { id } = action.payload;
        const index = state.products.findIndex((product)=> product.id === id );
        if(index !== -1) {
            state.products[index] = action.payload;
        }
    },
    setproducts: (state, action)=> {
        state.products = action.payload;
    },
},
});
export const { addProduct, deleteproduct, editproduct, setproducts } = productSlice.actions;
export default productSlice