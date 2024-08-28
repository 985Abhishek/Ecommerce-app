import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tableData : [],
    totalTax : 0,
    totalPrice : 0,
};

const calculatedTax = (taxAmount, quantity)=> {
    return taxAmount * quantity;
};

const calculatePrice = (price, quantity) => {
    return price*quantity;
}

const sliceData = createSlice({
    name: 'sliceData',
    initialState,
    reducers: {
        addItem:(state, action)=> {
            const newItem = {
                ...action.payload,
                totalTax: calculatedTax(action.payload.taxAmount, action.payload.quantity),
                totalPrice: calculatePrice(action.payload.price, action.payload.quantity)
            };
            state.tableData.push(newItem);
            state.totalTax += newItem.totalTax;
            state.totalPrice += newItem.totalPrice;
        },
        updateQuantity: (state, action) => {
            if (!state) return state;

            const { id, quantity } = action.payload;
            const itemIndex = state.tableData.findIndex(item => item.id === id);

            if (itemIndex !== -1) {
                const item = state.tableData[itemIndex];
                const previousTax = item.totalTax;
                const previousPrice = item.totalPrice;

                item.quantity = quantity;
                item.totalTax = calculateTotalTax(item.taxAmount, quantity);
                item.totalPrice = calculateTotalPrice(item.price, quantity);

                state.totalTax += item.totalTax - previousTax;
                state.totalPrice += item.totalPrice - previousPrice;
            }
        },
        removeItem: (state, action) => {
            const itemIndex = state.tableData.findIndex(item => item.id === action.payload);
            if (itemIndex !== -1) {
                const item = state.tableData[itemIndex];
                state.totalTax -= item.totalTax;
                state.totalPrice -= item.totalPrice;
                state.tableData.splice(itemIndex, 1);
            }
        },
        resetTable: (state) => {
            state.tableData = [];
            state.totalTax = 0;
            state.totalPrice = 0;
        },
    },
});

export const { addItem, updateQuantity, removeItem, resetTable } = sliceData.actions;
export default sliceData.reducer;
   